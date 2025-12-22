import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pin, Users, TrendingUp, DollarSign, Plus, Package, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { PinterestAccounts } from "@/components/dashboard/PinterestAccounts";
import { ProductsGrid } from "@/components/dashboard/ProductsGrid";
import { FacebookGroups } from "@/components/dashboard/FacebookGroups";
import { ScheduledPins } from "@/components/dashboard/ScheduledPins";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const getPageTitle = (tab: string) => {
  const titles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: "Dashboard", subtitle: "Welcome back! Here's your overview" },
    products: { title: "Products", subtitle: "Manage your product catalog" },
    pinterest: { title: "Pinterest", subtitle: "Manage accounts and scheduled pins" },
    facebook: { title: "Facebook Groups", subtitle: "Manage your Facebook automation" },
    analytics: { title: "Analytics", subtitle: "Track your performance metrics" },
    settings: { title: "Settings", subtitle: "Configure your preferences" },
  };
  return titles[tab] || { title: "Dashboard", subtitle: "" };
};

export function Dashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isEtsyImporting, setIsEtsyImporting] = useState(false);
  const { title, subtitle } = getPageTitle(activeTab);
  const { toast } = useToast();

  const location = useLocation();
  const navigate = useNavigate();

  // Handle Etsy OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    // Handle OAuth errors
    if (error) {
      toast({
        title: "Etsy Connection Failed",
        description: `Error: ${error}`,
        variant: "destructive",
      });
      navigate("/dashboard", { replace: true });
      return;
    }

    // Handle successful OAuth callback
    if (code && state) {
      setIsEtsyImporting(true);

      // Exchange code for access token (backend validates state)
      fetch("http://localhost:5000/api/etsy/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include auth token if you have user authentication
          // "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({ code, state }),
        credentials: "include", // Include cookies for session management
      })
        .then(async (res) => {
          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to connect to Etsy");
          }
          return res.json();
        })
        .then((data) => {
          toast({
            title: "Success!",
            description: "Successfully connected to Etsy. Importing products...",
          });

          // Clean up
          sessionStorage.removeItem("etsy_oauth_state");
          navigate("/dashboard?tab=products", { replace: true });

          // Optionally trigger product import
          // importEtsyProducts();
        })
        .catch((err) => {
          console.error("Etsy token exchange failed:", err);
          toast({
            title: "Connection Failed",
            description: err.message || "Failed to connect to Etsy. Please try again.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsEtsyImporting(false);
          navigate("/dashboard", { replace: true });
        });
    }
  }, [location, navigate, toast]);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: api.products.getAll,
    enabled: activeTab === "products",
  });

  const handleAddProduct = () => {
    setIsProductFormOpen(true);
  };

  const handleEtsyImportAndAuth = async () => {
    try {
      // Get OAuth URL from backend (backend generates the state)
      const response = await fetch("http://localhost:5000/api/etsy/auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to initiate Etsy connection");
      }

      const { url } = await response.json();

      // URL already contains the state parameter from backend
      window.location.href = url;
    } catch (error) {
      console.error("Etsy auth error:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Etsy. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFormClose = () => setIsProductFormOpen(false);
  const handleFormSuccess = () => {
    setIsProductFormOpen(false);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <DashboardLayout
      title={title}
      subtitle={subtitle}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {isEtsyImporting && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-blue-900">Connecting to Etsy...</span>
        </div>
      )}

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Pins Posted Today"
              value="42"
              change="+12%"
              changeType="positive"
              icon={Pin}
              gradient
            />
            <StatCard
              title="Total Impressions"
              value="128.4K"
              change="+8.3%"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Facebook Posts"
              value="18"
              change="+5%"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Revenue (Pinterest)"
              value="$2,340"
              change="+15.2%"
              changeType="positive"
              icon={DollarSign}
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>

          <PinterestAccounts />
          <ScheduledPins />
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="py-1.5 px-3">
                <Package className="w-4 h-4 mr-2" />
                {products?.length || 0} Products
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleEtsyImportAndAuth}
                disabled={isEtsyImporting}
              >
                {isEtsyImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Import from Etsy"
                )}
              </Button>
              <Button variant="gradient" onClick={handleAddProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
          <ProductsGrid />
        </div>
      )}

      {activeTab === "pinterest" && (
        <div className="space-y-6">
          <PinterestAccounts />
          <ScheduledPins />
        </div>
      )}

      {activeTab === "facebook" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Active Accounts" value="3" icon={Users} />
            <StatCard title="Groups Joined" value="24" change="+4 this week" changeType="positive" icon={Users} />
            <StatCard title="Posts Today" value="18" icon={TrendingUp} />
          </div>
          <FacebookGroups />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Impressions" value="1.2M" change="+23%" changeType="positive" icon={TrendingUp} gradient />
            <StatCard title="Total Clicks" value="45.2K" change="+18%" changeType="positive" icon={Pin} />
            <StatCard title="Click-through Rate" value="3.8%" change="+0.5%" changeType="positive" icon={TrendingUp} />
            <StatCard title="Revenue Tracked" value="$12,450" change="+32%" changeType="positive" icon={DollarSign} />
          </div>
          <PerformanceChart />
        </div>
      )}

      {activeTab === "settings" && (
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Settings</h3>
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      )}

      <ProductForm
        product={null}
        open={isProductFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    </DashboardLayout>
  );
}