import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';
import AddEntryForm from './AddEntryForm';

interface AddEntryModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  handleSubmit: <T>(values: T) => void;
}

export const useDiagnosesArrays = (): Diagnosis[] => {
  const [{ diagnosis }] = useStateValue();
  const arrayToExport: Diagnosis[] = [];
  for(const [, value] of Object.entries(diagnosis)){
    arrayToExport.push(value);
  }
  return arrayToExport;
};

const AddEntryModal: React.FC<AddEntryModalProps> = ({ modalOpen, closeModal, handleSubmit}) => {
  return(
    <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <AddEntryForm handleSubmit={handleSubmit}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
