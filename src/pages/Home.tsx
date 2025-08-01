import { ArrowRight, Globe, Play, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import hero from '../assets/videos/hero.mp4'
import HeaderForHomepage from '../components/layout/HeaderForHomepage';

const Home: React.FC = () => {


  return (
     <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20  h-full">
        <video src={hero} className="absolute inset-0 w-full h-full object-cover opacity-70" autoPlay loop muted  />
       <HeaderForHomepage />
        
        <div className="relative z-10  md:max-w-7xl mt-60 ml-4 md:ml-12  text-left">
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
            <Link
              to="/make-videos"
              className="border border-purple-400/50 text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400/10 transition-all flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
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
