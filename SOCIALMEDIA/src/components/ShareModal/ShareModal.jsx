import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react';
import '../../pages/Auth/Auth.css';
import PostShare from '../PostShare/PostShare';

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      size="55%"
      onClose={() => setModalOpened(false)}
    >
      {/* Modal content */}
      <PostShare />
    </Modal>
  );
}

export default ShareModal;
