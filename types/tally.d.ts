declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: {
        layout?: 'modal' | 'page'
        width?: number
        autoClose?: number
      }) => void
    }
  }
}

export {}
