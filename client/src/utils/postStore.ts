import create from 'zustand';

const postStore = (set) => ({
    auth: false,
    setAuth: (value:boolean) => set({ auth: value }),
})

const usePostStore = create(postStore)

export default usePostStore