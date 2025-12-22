import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface PinterestAccount {
  id: string;
  name: string;
  username: string;
  status: "active" | "rate_limited" | "error";
  pinsToday: number;
  dailyLimit: number;
  avatar: string;
  authenticatedAt?: string;
}

const getStatusBadge = (status: PinterestAccount["status"]) => {
  switch (status) {
    case "active": return <Badge variant="success">Active</Badge>;
    case "rate_limited": return <Badge variant="warning">Rate Limited</Badge>;
    case "error": return <Badge variant="destructive">Error</Badge>;
  }
};

export function PinterestAccounts() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [pinterestStatus, setPinterestStatus] = useState<{ authenticated: boolean; authenticatedAt?: string } | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Credential form state
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [saveError, setSaveError] = useState<string | null>(null);

  // Check status on mount
  useEffect(() => {
    checkPinterestStatus();
  }, []);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const checkPinterestStatus = async () => {
    try {
      setIsCheckingStatus(true);
      const status = await api.pinterest.getStatus();
      setPinterestStatus(status);

      // If authenticated, stop polling and update status message
      if (status.authenticated) {
        setConnectionStatus("Pinterest account connected successfully! ✅");
        // Clear any existing polling interval
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
        // Clear status message after 5 seconds
        setTimeout(() => {
          setConnectionStatus(null);
        }, 5000);
      }
    } catch (error: any) {
      console.error("Failed to check Pinterest status:", error);
      setPinterestStatus({ authenticated: false });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleConnectClick = () => {
    setShowCredentialForm(true);
    setConnectionStatus(null);
    setSaveError(null);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    if (!credentials.email || !credentials.password) {
      setSaveError("Please enter both email and password");
      return;
    }

    try {
      setIsConnecting(true);
      // 1. Save credentials
      await api.pinterest.saveCredentials(credentials);

      // 2. Hide form
      setShowCredentialForm(false);

      // 3. Proceed with connection
      await connectPinterest();
    } catch (error: any) {
      console.error("Failed to save credentials:", error);
      setSaveError(error.response?.data?.message || "Failed to save credentials");
      setIsConnecting(false);
    }
  };

  const connectPinterest = async () => {
    try {
      setIsConnecting(true);
      setConnectionStatus(null);

      console.log("Initiating Pinterest connection...");
      const response = await api.pinterest.connect();

      if (response.success) {
        setConnectionStatus("Browser window opened! Please complete login in the browser window. Waiting for connection...");

        // Start polling for status every 3 seconds
        const interval = setInterval(async () => {
          try {
            console.log("Polling Pinterest status...");
            const status = await api.pinterest.getStatus();
            console.log("Pinterest status:", status);
            setPinterestStatus(status);

            // If authenticated, stop polling
            if (status.authenticated) {
              console.log("Pinterest authenticated! Stopping polling.");
              clearInterval(interval);
              setPollingInterval(null);
              setConnectionStatus("Pinterest account connected successfully! ✅");
              // Clear status message after 5 seconds
              setTimeout(() => {
                setConnectionStatus(null);
              }, 5000);
            }
          } catch (error) {
            console.error("Error polling Pinterest status:", error);
          }
        }, 3000);
        setPollingInterval(interval);

        // Stop polling after 5 minutes
        setTimeout(() => {
          if (interval) {
            clearInterval(interval);
            setPollingInterval(null);
            if (!pinterestStatus?.authenticated) {
              setConnectionStatus("Connection timeout. Please try connecting again.");
            }
          }
        }, 300000); // 5 minutes
      }
    } catch (error: any) {
      console.error("Failed to connect Pinterest:", error);
      setConnectionStatus(
        error.response?.data?.message ||
        error.message ||
        "Failed to connect Pinterest account. Please try again."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  // Generate account from status
  const getAccountFromStatus = (): PinterestAccount | null => {
    if (!pinterestStatus?.authenticated) return null;

    const authenticatedDate = pinterestStatus.authenticatedAt
      ? new Date(pinterestStatus.authenticatedAt)
      : new Date();

    return {
      id: "1",
      name: "Pinterest Account",
      username: "@pinterest",
      status: "active",
      pinsToday: 0,
      dailyLimit: 30,
      avatar: "PA",
      authenticatedAt: pinterestStatus.authenticatedAt
    };
  };

  const connectedAccount = getAccountFromStatus();

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Pinterest Accounts</h3>
        {!connectedAccount && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleConnectClick}
            disabled={isConnecting || isCheckingStatus}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {isConnecting && !showCredentialForm ? "Connecting..." : "Connect Pinterest"}
          </Button>
        )}
        {connectedAccount && (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Connected
          </Badge>
        )}

      </div>

      {
        showCredentialForm && !connectedAccount && (
          <div className="mb-6 p-4 rounded-lg bg-card border shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Enter Pinterest Credentials</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowCredentialForm(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pinterest-email">Email</Label>
                <Input
                  id="pinterest-email"
                  type="email"
                  placeholder="Pinterest account email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinterest-password">Password</Label>
                <Input
                  id="pinterest-password"
                  type="password"
                  placeholder="Pinterest account password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {saveError && (
                <p className="text-sm text-destructive">{saveError}</p>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCredentialForm(false)}>Cancel</Button>
                <Button type="submit" disabled={isConnecting}>
                  {isConnecting ? "Saving & Connecting..." : "Save & Connect"}
                </Button>
              </div>
            </form>
          </div>
        )
      }

      {
        connectionStatus && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${connectionStatus.includes("opened") || connectionStatus.includes("Waiting") || connectionStatus.includes("successfully")
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : connectionStatus.includes("timeout") || connectionStatus.includes("Failed")
              ? "bg-red-500/10 text-red-600 dark:text-red-400"
              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}>
            {connectionStatus}
            {pollingInterval && !connectionStatus.includes("successfully") && (
              <span className="ml-2 animate-pulse">⏳</span>
            )}
          </div>
        )
      }

      {
        isCheckingStatus && !connectionStatus && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Checking connection status...
          </div>
        )
      }

      <div className="space-y-4">
        {connectedAccount ? (
          <div
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {connectedAccount.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{connectedAccount.name}</p>
                <p className="text-sm text-muted-foreground">{connectedAccount.username}</p>
                {connectedAccount.authenticatedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Connected {new Date(connectedAccount.authenticatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {connectedAccount.pinsToday} / {connectedAccount.dailyLimit}
                </p>
                <p className="text-xs text-muted-foreground">pins today</p>
              </div>

              <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400 transition-all duration-500"
                  style={{ width: `${(connectedAccount.pinsToday / connectedAccount.dailyLimit) * 100}%` }}
                />
              </div>

              {getStatusBadge(connectedAccount.status)}

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p className="mb-2">No Pinterest account connected</p>
            <p className="text-sm">Click "Connect Pinterest" to get started</p>
          </div>
        )}
      </div>
    </div >
  );
}