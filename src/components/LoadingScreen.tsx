const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Loading...
        </h2>
        <p className="text-muted-foreground">Preparando la pagina...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
