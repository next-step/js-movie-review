const ConfirmModal = (message) => {
    const content = `          
          <div class="modal-content">
            ${message}
            <button class="close-button">close</button>
          </div>`;

    return content;
};

export default ConfirmModal;
