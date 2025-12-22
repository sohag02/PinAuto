import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from 'react-router-dom';

import { 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Calendar, 
  Shield, 
  Sparkles,
  Pin,
  Users,
  TrendingUp,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content",
    description: "Generate stunning pins and videos with NanoBanana and SORA AI"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automate posting with intelligent timing for maximum reach"
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Track performance, clicks, and conversions in real-time"
  },
  {
    icon: Shield,
    title: "Safe Automation",
    description: "Human-like behavior simulation to protect your accounts"
  }
];

const stats = [
  { value: "2M+", label: "Pins Posted" },
  { value: "500K", label: "Monthly Impressions" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Automation" }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individual sellers",
    features: [
      "1 Pinterest Account",
      "100 Pins/month",
      "Basic Analytics",
      "Email Support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing businesses",
    features: [
      "5 Pinterest Accounts",
      "Unlimited Pins",
      "3 Facebook Accounts",
      "AI Video Generation",
      "Advanced Analytics",
      "Priority Support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For agencies & teams",
    features: [
      "Unlimited Accounts",
      "White-label Reports",
      "API Access",
      "Dedicated Manager",
      "Custom Integrations"
    ],
    popular: false
  }
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PA</span>
            </div>
            <span className="font-bold text-xl text-foreground">PinAuto</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Sign In</Button>
            <Button variant="gradient" size="sm" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gradient" className="mb-6">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Social Media Automation
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Automate Your{" "}
              <span className="gradient-text">Pinterest</span>
              {" "}& Facebook Growth
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Generate AI-powered pins and videos, schedule posts, and track performance. 
              Drive traffic to your Etsy store on autopilot.
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button variant="gradient" size="xl" onClick={onGetStarted}>
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="relative rounded-2xl overflow-hidden border border-border shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
            <div className="bg-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="grid grid-cols-12 gap-4">
                {/* Sidebar Preview */}
                <div className="col-span-2 bg-secondary rounded-lg p-4 space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-muted rounded-md" />
                  ))}
                </div>
                {/* Main Content Preview */}
                <div className="col-span-10 space-y-4">
                  <div className="h-12 bg-secondary rounded-lg" />
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-24 bg-secondary rounded-lg" />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-48 bg-secondary rounded-lg" />
                    <div className="h-48 bg-secondary rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful automation tools designed specifically for Etsy sellers and content creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Three Simple Steps
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Pin, step: "01", title: "Connect Accounts", description: "Link your Pinterest, Facebook, and Etsy accounts" },
              { icon: Sparkles, step: "02", title: "Import Products", description: "Add your products manually or sync from Etsy" },
              { icon: TrendingUp, step: "03", title: "Start Automating", description: "Let AI generate and post content automatically" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-400 mb-6">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 -z-10 text-8xl font-bold text-muted/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you're ready
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`p-6 h-full relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`}>
                  {plan.popular && (
                    <Badge variant="gradient" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? "gradient" : "outline"} 
                    className="w-full"
                    onClick={onGetStarted}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-card to-accent/20 border border-border p-12 text-center">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ready to Automate Your Growth?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of sellers already using PinAuto to drive traffic and sales
              </p>
              <Button variant="gradient" size="xl" onClick={onGetStarted}>
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">PA</span>
              </div>
              <span className="font-semibold text-foreground">PinAuto</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 PinAuto. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
