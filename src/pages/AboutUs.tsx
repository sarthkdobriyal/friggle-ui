import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About Friggle.ai</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We're on a mission to democratize video creation through the power of artificial intelligence, 
            making professional-quality video production accessible to everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Founded in 2024, Friggle.ai emerged from a simple observation: creating compelling video content 
            shouldn't require expensive equipment, extensive technical knowledge, or weeks of production time. 
            Our team of AI researchers, engineers, and creative professionals came together to build something revolutionary.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Today, we're proud to serve thousands of creators, marketers, educators, and storytellers who use 
            our platform to bring their visions to life. From concept to creation, we're transforming how the 
            world thinks about video production.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
              <Target className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Innovation First</h3>
            <p className="text-gray-300">
              We push the boundaries of what's possible with AI technology, constantly evolving our models 
              to deliver better, faster, and more creative results.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Community Driven</h3>
            <p className="text-gray-300">
              Our platform grows with our community. We listen to feedback, understand needs, and build 
              features that truly matter to our users.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
              <Award className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Quality Excellence</h3>
            <p className="text-gray-300">
              Every video generated through our platform meets professional standards. We never compromise 
              on quality, ensuring your content stands out.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 w-fit mb-4">
              <Heart className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Ethical AI</h3>
            <p className="text-gray-300">
              We believe in responsible AI development. Our systems are designed with fairness, transparency, 
              and user privacy at their core.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-gray-300 text-lg mb-8">
            Behind Friggle.ai is a diverse team of passionate individuals working to reshape the future of content creation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-founder', expertise: 'AI Research & Strategy' },
              { name: 'Marcus Rodriguez', role: 'CTO & Co-founder', expertise: 'Machine Learning Engineering' },
              { name: 'Elena Kowalski', role: 'Head of Design', expertise: 'User Experience & Creative Direction' }
            ].map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full mx-auto mb-4"></div>
                <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;