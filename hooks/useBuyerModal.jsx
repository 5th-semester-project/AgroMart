import {create} from "zustand"

const useBuyerModal = create((set) => ({
    isOpen: true,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useBuyerModal