import { ArrowRight, ChevronDown, ChevronUp, Globe, Play, Sparkles, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import hero from '../assets/videos/hero.mp4'
import HeaderForHomepage from '../components/layout/HeaderForHomepage';
import { useQuery } from '@tanstack/react-query';
import { videoApi } from '@/services/videoApi';
import type { Video } from '@/types';

const Home: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

   const {
      data: exampleVideos,
      isLoading: isLoadingExample,
      error: exampleError,
    } = useQuery({
      queryKey: ["exampleVideos"],
      queryFn: () => videoApi.getExampleVideos(),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

    console.log(exampleVideos);

  const faqs = [
    {
      question: "How does AI video generation work?",
      answer: "Our AI analyzes your text prompt and generates videos using advanced machine learning models. Simply describe what you want to see, and our AI creates realistic video content based on your description."
    },
    {
      question: "What video formats and resolutions are supported?",
      answer: "We support multiple formats including MP4, MOV, and WebM. Videos can be generated in various resolutions from 720p to 4K, depending on your subscription plan."
    },
    {
      question: "How long does it take to generate a video?",
      answer: "Video generation typically takes 2-5 minutes for short clips (up to 30 seconds) and 10-15 minutes for longer videos, depending on complexity and current server load."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! New users get 3 free video generations to try our service. No credit card required for the trial period."
    },
    {
      question: "Can I use the generated videos commercially?",
      answer: "Yes, all videos generated with paid plans come with commercial usage rights. Free trial videos are for personal use only."
    },
    {
      question: "What languages are supported for prompts?",
      answer: "We support prompts in over 20 languages including English, Spanish, French, German, Chinese, Japanese, and more. The AI can also generate videos with text in different languages."
    }
  ];

  return (
     <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20  h-full">
        <video src={hero} className="absolute inset-0 w-full h-full object-cover opacity-70" autoPlay loop muted  />
       <HeaderForHomepage />
        
        <div className="relative z-10  md:max-w-7xl mt-18 sm:mt-32  md:mt-44 ml-4 md:ml-12  text-left">
          <div className="flex justify-start mb-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <Play className="h-16 w-16 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight flex-col flex">
            Create Stunning
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> AI Videos</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 mb-8 max-w-3xl w-[80%]  leading-relaxed">
            Transform your ideas into captivating videos with our cutting-edge AI technology. 
            No experience needed – just describe your vision and watch it come to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Creating Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to create professional AI-generated videos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/30 transition-all">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Generation</h3>
              <p className="text-gray-300">
                Advanced AI models create stunning videos from simple text descriptions with incredible detail and realism.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/30 transition-all">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-300">
                Generate high-quality videos in minutes, not hours. Our optimized infrastructure ensures rapid processing.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/30 transition-all">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
                <Globe className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Global Reach</h3>
              <p className="text-gray-300">
                Create content in multiple languages and styles. Perfect for global audiences and diverse content needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Videos Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/30 to-purple-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">See AI in Action</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover what our AI can create from simple text prompts
            </p>
          </div>
          
          {isLoadingExample ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : exampleError ? (
            <div className="text-center text-gray-400 py-20">
              <p>Unable to load example videos</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {exampleVideos?.slice(0, 3).map((video: Video) => (
                <div key={video._id} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all">
                  <div className="aspect-video relative bg-black/20">
                    <video 
                      src={video.video_url} 
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  </div>
                 
                </div>
              ))}
            </div>
          )}
          
          {exampleVideos && exampleVideos.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600/30 hover:to-blue-600/30 transition-all border border-purple-400/30"
              >
                <span>Create Your Own Video</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 text-lg">
              Get answers to common questions about AI video generation
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Create Amazing Videos?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of creators who are already using Friggle.ai to bring their visions to life.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
