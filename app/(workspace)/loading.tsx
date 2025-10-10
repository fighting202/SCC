export default function WorkspaceLoading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-base font-medium text-foreground">Loading workspace...</p>
        </div>
      </div>
    </div>
  )
}
