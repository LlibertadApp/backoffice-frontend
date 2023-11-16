import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from '@nextui-org/react';

interface DeleteFiscalModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    fiscalID: string;
}

const DeleteFiscalModal = ({ isOpen, onOpenChange, fiscalID }: DeleteFiscalModalProps) => {
    const onDeleteFiscal = (onClose: () => void, fiscalID: string) => {
        //TODO: deletear el fiscal con el id
        console.log(fiscalID);
        onClose();
    };

    return (
        <Modal
            classNames={{
                body: 'py-6',
                backdrop: 'bg-[#353434]/50 backdrop-opacity-40',
                base: 'border-[#353434] bg-[#1E1E1E] dark:bg-[#1E1E1E] text-[#EBE8E8]',
                header: 'border-b-[1px] border-[#353434]',
                footer: 'border-t-[1px] border-[#353434]',
                closeButton: 'hover:bg-white/5 active:bg-white/10',
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Esta seguro?</ModalHeader>
                        <ModalBody>
                            <p>
                                Esta seguro que quiere eliminar este fiscal? tenga en cuenta que si lo elimina este fiscal no podra acceder a la
                                aplicacion.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="danger" onPress={() => onDeleteFiscal(onClose, fiscalID)}>
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteFiscalModal;
