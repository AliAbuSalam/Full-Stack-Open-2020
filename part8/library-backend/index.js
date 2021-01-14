require('dotenv').config();
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const pubsub = new PubSub();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
  .then(() => console.log('connected to database'))
  .catch(error => {
    console.log('error connecting to database: ', error.message);
});

const JWT_KEY = 'A_SUPER_SEKRIT_KEY_USED_FOR_TOKEN';
const password = 'nopassword';

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    updateBookCount: String
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    addAuthor(
      name: String!
      born: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}), 
    authorCount: () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
        return Book.find({});
      }
      const genreToFind = args.genre ? args.genre : { $exists: true };
      let authorToFind = args.author ? await Author.findOne({ name: args.author }) : { $exists: true };
      
      if(!authorToFind){
        return new UserInputError('no author with that name');
      } else if(authorToFind && authorToFind._id){
        authorToFind = authorToFind._id;
      }

      return Book.find({
        author: authorToFind,
        genres: genreToFind
      });
    },
    allAuthors: async () => {
      const allAuthor = await Author.find({});
      return allAuthor.map(author => {
        if(!author.bookCount){
          author.bookCount = 0
        }
        return author;
      });
    },
    updateBookCount: async () => {
      const allAuthors = await Author.find({});
      for await (const author of allAuthors){
        const numberOfBooks = (await Book.find({ author: author.id })).length
        author.bookCount = numberOfBooks;
        await author.save();
      }
      return 'success';
    },
    me: (root, args, context) => context.currentUser
  },
  Book: {
    author: (root) => Author.findById(root.author) 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError('not authenticated');
      }
      try{
        if(!(await Author.findOne({ name: args.author }))){
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
        }
        const authorOfTheBook = await Author.findOne({ name: args.author });
        authorOfTheBook.bookCount = authorOfTheBook.bookCount + 1;

        const book = new Book({
          title: args.title,
          published: args.published,
          author: authorOfTheBook._id,
          genres: args.genres
        });
        await authorOfTheBook.save();
        const createdBook = await book.save();
        pubsub.publish('ADDED_BOOK', { bookAdded: createdBook });
        return createdBook;
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError('not authenticated');
      }
      try {
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        const editedAuthor = await author.save();
        return editedAuthor;
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
    },
    addAuthor: async (root, args) => {
      const author = new Author({
        name: args.name,
        bookCount: 0
      });
      if(args.born){
        author.born = args.born
      }
      try{
        const newAuthor = await author.save();
        return newAuthor;
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return newUser.save()
        .catch(error => {
          throw new UserInputError(error.name, {
            invalidArgs: args
          })
      });
    },
    login: async (root, args) => {
      const validUser = await User.findOne({ username: args.username });
      console.log('validUser: ', validUser);
      if(!validUser || args.password !== password){
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: validUser.username,
        id: validUser._id
      }
      const token = jwt.sign(userForToken, JWT_KEY);
      return { value: token };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['ADDED_BOOK'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req? req.headers.authorization: null;
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_KEY
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser }
    }
  },
  formatError: (error) => {
    console.log(error);
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
})