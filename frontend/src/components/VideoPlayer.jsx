function VideoPlayer({ title, videoUrl, summary }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="aspect-video w-full bg-slate-950">
        <iframe
          className="h-full w-full"
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="space-y-2 p-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm leading-7 text-slate-300">{summary}</p>
      </div>
    </div>
  );
}

export default VideoPlayer;
