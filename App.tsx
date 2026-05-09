
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  Bot,
  Sparkles,
  Lock,
  Globe,
  RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Constants ---
const TYPEFORM_URL = "https://typeform.com/"; 
const SLOTS_REMAINING = 2;

// --- AI Image Generator Component ---
const GenAIImage = ({ prompt, className, alt }: { prompt: string, className?: string, alt: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            setLoading(false);
            return;
          }
        }
        throw new Error("No image data found");
      } catch (err) {
        console.error("Image generation failed:", err);
        setError(true);
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt]);

  if (loading) {
    return (
      <div className={`${className} bg-slate-100 animate-pulse flex flex-col items-center justify-center text-slate-400 gap-3`}>
        <RefreshCw className="animate-spin" size={24} />
        <span className="text-xs font-medium">Generating Custom Visual...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return <img src={`https://picsum.photos/seed/${alt}/800/600`} alt={alt} className={className} />;
  }

  return <img src={imageUrl} alt={alt} className={`${className} transition-opacity duration-1000 opacity-100`} />;
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border-b border-slate-200/50' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/20">
              <Sparkles size={24} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 hidden sm:block">Clarity<span className="text-primary-600">Audit</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Methodology</a>
            <a href="#benefits" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">What You Get</a>
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-500/30">
              Apply For Free Slot
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-bold p-3 text-slate-900 rounded-xl hover:bg-slate-50 transition-colors">Methodology</a>
          <a href="#benefits" onClick={() => setIsOpen(false)} className="text-lg font-bold p-3 text-slate-900 rounded-xl hover:bg-slate-50 transition-colors">What You Get</a>
          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 text-white bg-primary-600 rounded-2xl font-extrabold shadow-xl">
            Get Started (Free)
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <header className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 text-primary-700 text-sm font-bold mb-8 shadow-sm">
            <Zap size={16} fill="currentColor" /> First 5 Customers Get It 100% Free
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95] drop-shadow-sm">
            Your Growth Is <br />
            <span className="gradient-text">Bottlenecked.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium">
            Stop guessing. Our professional diagnostic framework pinpoints exactly what's blocking your next level—so you can finally break through.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 text-xl font-extrabold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Get Your Free Audit <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </a>
            <div className="flex flex-col gap-1">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Client" />)}
              </div>
              <p className="text-sm font-bold text-slate-500">Only {SLOTS_REMAINING} free spots left</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="absolute -inset-4 bg-primary-100/40 rounded-[3rem] blur-2xl -z-10 animate-float" />
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
            <GenAIImage 
              prompt="Professional minimalist 3d render of a high-tech business dashboard with glowing growth charts, hyper-realistic, studio lighting, soft shadows, blue and violet tones" 
              className="w-full aspect-square object-cover" 
              alt="Business Growth Dashboard"
            />
            <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Efficiency Target</p>
                  <p className="text-2xl font-extrabold text-slate-900">+40% MRR Lift</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const ProblemSection = () => {
  const pains = [
    {
      title: "The Effort Paradox",
      desc: "You're working more hours than ever, but your revenue hasn't budged in 6 months. You're exhausted but stationary.",
      icon: <Clock className="text-indigo-500" />
    },
    {
      title: "Operational Chaos",
      desc: "Your processes are held together by duct tape and memory. Scaling feels impossible because everything relies on you.",
      icon: <Zap className="text-amber-500" />
    },
    {
      title: "Decision Fatigue",
      desc: "Too many 'priorities' and zero clarity. You're paralyzed by choice, wasting energy on tasks that don't move the needle.",
      icon: <Target className="text-rose-500" />
    }
  ];

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden text-white rounded-[4rem] mx-4 my-20">
      <div className="absolute inset-0 bg-primary-900/10 mesh-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Why aren't you scaling?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">If hard work was the only variable, you'd already be at the top. It's time to fix the system.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {pains.map((pain, idx) => (
            <div key={idx} className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {pain.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{pain.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const benefits = [
    { title: "Core Constraint Mapping", desc: "We identify the single point of failure in your business funnel.", icon: <Lock className="text-primary-600" /> },
    { title: "AI Deployment Plan", desc: "Specific workflows that can be automated today using modern AI tools.", icon: <Bot className="text-primary-600" /> },
    { title: "Execution Playbook", desc: "A step-by-step 90-day roadmap for your team to follow.", icon: <Globe className="text-primary-600" /> },
    { title: "Impact Analysis", desc: "Predicted ROI and growth curves based on your audit results.", icon: <BarChart3 className="text-primary-600" /> }
  ];

  return (
    <section id="benefits" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-6 bg-primary-100 rounded-[3.5rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white">
                 <GenAIImage 
                    prompt="High quality close up of a professional printed business audit report on a desk next to a modern laptop, artistic shallow depth of field, minimalist, professional photography" 
                    className="w-full object-cover aspect-[4/5] lg:aspect-square" 
                    alt="Audit Report Sample"
                  />
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-black mb-6">THE SOLUTION</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
              A Growth Roadmap <br /> <span className="text-primary-600">Without The Guesswork.</span>
            </h2>
            
            <div className="space-y-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-2">{b.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <a href={TYPEFORM_URL} className="inline-flex items-center text-primary-600 font-extrabold text-lg gap-2 hover:gap-4 transition-all group">
                Reserve Your Free Slot (First 5 Only) <ArrowRight size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-32 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="bg-primary-600 p-12 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary-500/40">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
           <Zap size={200} fill="white" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1]">
            We build your growth roadmap <span className="text-primary-200">for free.</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-12 font-medium leading-relaxed opacity-90">
            We are looking for our first 5 case studies. If you qualify, we'll perform our full professional audit and provide your roadmap at no cost. In return, we just ask for a video testimonial if we deliver incredible value.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-6 text-2xl font-black text-primary-600 bg-white rounded-3xl hover:bg-primary-50 shadow-2xl transition-all hover:-translate-y-2 active:scale-95">
              Apply For Your Free Audit
            </a>
            <div className="flex flex-wrap justify-center gap-8 text-primary-100 font-bold opacity-80 uppercase tracking-widest text-xs">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> No Credit Card Required</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> 100% Confidential</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Only {SLOTS_REMAINING} Free Slots Left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#f8fafc] border-t border-slate-200 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <Sparkles size={20} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Clarity Audit</span>
          </div>
          <p className="text-slate-500 max-w-sm text-lg leading-relaxed font-medium">
            The world's first data-driven operational audit specifically designed for small business owners and solopreneurs who are ready to scale.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Navigation</h4>
          <ul className="space-y-4 font-bold text-slate-500">
            <li><a href="#how-it-works" className="hover:text-primary-600 transition-colors">Methodology</a></li>
            <li><a href="#benefits" className="hover:text-primary-600 transition-colors">Audit Benefits</a></li>
            <li><a href={TYPEFORM_URL} className="hover:text-primary-600 transition-colors">Secure Free Slot</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Legal</h4>
          <ul className="space-y-4 font-bold text-slate-500">
            <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Terms</a></li>
            <li><a href="mailto:hello@bottleneckclarity.com" className="hover:text-primary-600 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-sm">
        <p>© 2026 Bottleneck Clarity Audit. First 5 clients special offer active.</p>
        <div className="flex items-center gap-10">
          <span className="hover:text-slate-600 cursor-pointer">Twitter</span>
          <span className="hover:text-slate-600 cursor-pointer">LinkedIn</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary-200 selection:text-primary-900">
      <Navbar />
      <main>
        <Hero />
        
        {/* Trust Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-600" />
            <div className="flex items-center gap-8">
               <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary-600 border border-slate-100 group-hover:rotate-6 transition-transform">
                  <ShieldCheck size={40} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900">100% Free For First 5 Clients</h3>
                  <p className="text-slate-500 font-medium text-lg">No hidden fees. No commitments. Just clarity.</p>
               </div>
            </div>
            <a href={TYPEFORM_URL} className="w-full md:w-auto px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
               Apply Now <ChevronRight size={20} />
            </a>
          </div>
        </div>
        
        <ProblemSection />
        <SolutionSection />
        
        {/* Final Hook */}
        <CTASection />
      </main>
      <Footer />
      
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-40">
        <a href={TYPEFORM_URL} className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black text-center shadow-2xl flex items-center justify-center gap-2">
           Apply For Free Audit <Zap size={20} fill="white" />
        </a>
      </div>
    </div>
  );
}
