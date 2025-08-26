/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Play, Download, Share2, Sparkles } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
import { videoApi } from "@/services/videoApi";
import { toast } from "sonner";
import type { Video } from "@/types";

interface MakeVideosPageProps {
  isDashboard?: boolean;
}

const MakeVideos: React.FC<MakeVideosPageProps> = ({ isDashboard = false }) => {
  const { isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);

  const generateVideoMutation = useMutation({
    mutationFn: (prompt: string) => videoApi.generateVideo(prompt),
    onSuccess: (data) => {
      toast.success("Video generated successfully!");
      console.log("Generated video data:", data);
      setGeneratedVideo(data.videoUrl || "generated-video-url");
    },
    onError: (error: any) => {
      console.error("Video generation failed:", error);
      // Handle error appropriately
      toast(error.response?.data?.error || "Video generation failed");
    },
  });
  const enhancePrompt = useMutation({
    mutationFn: (prompt: string) => videoApi.enhancePrompt(prompt),
    onSuccess: (data) => {
      toast.success("Prompt enhanced successfully!");
      setPrompt(data.enhancedPrompt || prompt);
      console.log("Enhanced prompt data:", data);
    },
    onError: (error: any) => {
      console.error("Prompt enhancement failed:", error);
      // Handle error appropriately
      toast(error.response?.data?.error || "Prompt enhancement failed");
    },
  });

  const {
    data: recentVideos,
    isLoading: isLoadingRecent,
    error: recentError,
  } = useQuery({
    queryKey: ["recentVideos"],
    queryFn: () => videoApi.getRecentVideos(),
    enabled: isAuthenticated && isDashboard,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    if (!isAuthenticated) {
      setShowSignUpPrompt(true);
      return;
    }
    
    generateVideoMutation.mutate(prompt);
  };

  const handleSignUpPromptClose = () => {
    setShowSignUpPrompt(false);
  };

  const handleDownload = () => {
    if (!generatedVideo || generatedVideo === "generated-video-url") return;

    const link = document.createElement("a");
    link.href = generatedVideo;
    link.download = `generated-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!generatedVideo || generatedVideo === "generated-video-url") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my AI-generated video!",
          text: `Generated with prompt: "${prompt}"`,
          url: generatedVideo,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to copying URL
        await navigator.clipboard.writeText(generatedVideo);
        toast.success("Video URL copied to clipboard!");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(generatedVideo);
        toast.success("Video URL copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast.error("Failed to copy video URL");
      }
    }
  };

  console.log("Recent videos:", recentVideos);

  if (!isDashboard && !isAuthenticated) {
    // Preview mode for non-authenticated users
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Video Generation
            </h1>
            <p className="text-gray-300 text-lg">
              Experience the power of AI-driven video creation. Try it out below!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Describe your video
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="A cat playing with a ball of yarn in slow motion..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Generate Video</span>
            </button>
          </div>

          {/* Sign-up prompt modal */}
          {showSignUpPrompt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full">
                <h3 className="text-xl font-bold text-white mb-4">Sign Up Required</h3>
                <p className="text-gray-300 mb-6">
                  To generate AI videos, you need to create an account. Sign up now to start creating amazing videos with AI!
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSignUpPromptClose}
                    className="flex-1 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to sign up page - you may need to implement this based on your routing
                      window.location.href = '/register'; // or use your router
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sample videos showcase */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg mb-4 flex items-center justify-center">
                <Play className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Sample Video 1</h3>
              <p className="text-gray-400 text-sm">
                "A serene sunset over mountains"
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg mb-4 flex items-center justify-center">
                <Play className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Sample Video 2</h3>
              <p className="text-gray-400 text-sm">
                "Abstract colorful particles dancing"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard mode for authenticated users
  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Transparent overlay to block navigation/interactions during video generation */}
      {generateVideoMutation.isPending && (
        <div
          className="fixed inset-0 z-50 bg-transparent"
          style={{ pointerEvents: "auto" }}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create AI Videos
          </h1>
          <p className="text-gray-300">
            Transform your ideas into stunning videos with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-2">
            {/* Generated Video Display */}
            {(generatedVideo || generateVideoMutation.isPending) && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Generated Video
                </h3>

                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  {generateVideoMutation.isPending ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                      <p className="text-gray-300">Generating your video...</p>
                    </div>
                  ) : generatedVideo &&
                    generatedVideo !== "generated-video-url" ? (
                    <video
                      src={generatedVideo}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                      autoPlay
                      muted
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Play className="h-16 w-16 text-purple-400" />
                  )}
                </div>

                {generatedVideo && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleDownload}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6 mt-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Video Prompt</span>
              </h2>

              <div className="mb-6 relative">
                <textarea
                  rows={9}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={
                    generateVideoMutation.isPending || enhancePrompt.isPending
                  }
                  className="disabled:cursor-not-allowed w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Describe your video in detail... (e.g., 'A majestic eagle soaring through clouds at sunset, cinematic style')"
                />
                <button
                  onClick={() => enhancePrompt.mutate(prompt)}
                  disabled={!prompt.trim() || enhancePrompt.isPending}
                  className="justify-self-end mt-2 px-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {
                    enhancePrompt.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        <span>Enhance Prompt</span>
                      </>
                    )
                  }
                </button>
              </div>

              {/* <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <Select defaultValue="5">
                      <SelectTrigger className=" bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className=" bg-white/5 backdrop-blur-md border-white/10 text-white text-sm">
                        <SelectItem value="5">5 seconds</SelectItem>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="15">15 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Film className="h-4 w-4 text-gray-400" />
                    <Select defaultValue="720p">
                      <SelectTrigger className=" bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className=" bg-white/5 backdrop-blur-md border-white/10 text-white text-sm">
                        <SelectItem value="720p">HD (720p)</SelectItem>
                        <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <button className="text-gray-400 hover:text-white">
                  <Settings className="h-5 w-5" />
                </button>
              </div> */}

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || generateVideoMutation.isPending || enhancePrompt.isPending}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {generateVideoMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Generate Video</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recent Videos Sidebar */}
          <div className="lg:col-span-1">
            <div className=" backdrop-blur-lg rounded-2xl p-6 ">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Videos
              </h3>
              <p className="text-yellow-400 text-xs mb-4 p-2 bg-yellow-400/10 rounded border border-yellow-400/20">
                ⚠️ Videos will be automatically removed in 2 days
              </p>

              <div className="space-y-4">
                {isLoadingRecent ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                    <p className="text-gray-400 text-sm">Loading videos...</p>
                  </div>
                ) : recentError ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">
                      Failed to load recent videos
                    </p>
                  </div>
                ) : recentVideos && recentVideos.length > 0 ? (
                  recentVideos.slice(0, 5).map((video: Video) => (
                    <div
                      key={video.id}
                      className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded mb-2 relative overflow-hidden">
                        {video.video_url ? (
                          <video
                            src={video.video_url}
                            className="w-full h-full object-contain rounded"
                            controls
                            preload="metadata"
                            poster={video.thumbnailUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="h-6 w-6 text-purple-400" />
                          </div>
                        )}
                      </div>
                      <p
                        className="text-white text-sm font-medium mb-1 truncate"
                        title={video.title || video.prompt}
                      >
                        {video.title ||
                          video.prompt?.substring(0, 30) + "..." ||
                          "Untitled Video"}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {video.createdAt
                          ? new Date(video.createdAt).toLocaleDateString()
                          : "Recently created"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">No recent videos</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Generate your first video to see it here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeVideos;

