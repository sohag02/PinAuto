import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">PA</span>
              </div>
              <span className="font-semibold text-foreground">PinAuto</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We respect your privacy. At PinAuto ("we," "our," or "us"), we are committed to protecting your privacy. 
              This Privacy Policy explains how our application collects, uses, and protects information when you 
              connect your Pinterest account and use our Pinterest automation platform and related services (the "Service").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Important:</strong> This application uses Pinterest APIs to provide automation and analytics 
              features. The purpose of data usage is to enable Pinterest account management, automated pin publishing, 
              board management, and performance analytics through our Service.
            </p>
          </Card>

          {/* Information We Collect */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials and authentication information</li>
                  <li>Payment and billing information</li>
                  <li>Profile information and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We automatically collect information about how you interact with our Service, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and activity logs</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance metrics and analytics data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pinterest Data (via Pinterest API)</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong>VERY IMPORTANT:</strong> When you connect your Pinterest account through the Pinterest API, 
                  we collect the following Pinterest-specific data:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                  <li><strong>Pinterest Account ID</strong> - Your unique Pinterest account identifier</li>
                  <li><strong>Profile Information</strong> - Name, username, profile picture, and bio</li>
                  <li><strong>Boards</strong> - Board names, descriptions, and board data</li>
                  <li><strong>Pins</strong> - Pin images, descriptions, titles, and metadata</li>
                  <li><strong>Access Tokens</strong> - OAuth tokens required for API authentication</li>
                  <li><strong>Analytics Data</strong> - Pin performance metrics, impressions, clicks, and engagement data (if used)</li>
                  <li><strong>Content</strong> - Content you create or manage through our Service</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3 text-sm bg-muted/50 p-3 rounded">
                  <strong>Note:</strong> All Pinterest data is collected exclusively through the official Pinterest API 
                  and only with your explicit consent when you connect your account.
                </p>
              </div>
            </div>
          </Card>

          {/* How We Use Pinterest Data */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">How We Use Pinterest Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Purpose Limitation:</strong> Pinterest requires that we use Pinterest data only for specific, 
              limited purposes. We use Pinterest data exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li><strong>Publish Pins on your behalf</strong> - Automatically create and publish pins to your boards</li>
              <li><strong>Read boards and pins</strong> - Access your boards and pins to enable automation features</li>
              <li><strong>Provide analytics and automation features</strong> - Generate performance reports and enable scheduling</li>
              <li><strong>Manage your account</strong> - Facilitate account connection and management within our Service</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed text-sm bg-background p-3 rounded border border-border">
              <strong>❌ We do NOT use Pinterest data for any other purpose.</strong> We never use your Pinterest data 
              for advertising, marketing to third parties, or any purpose beyond what is explicitly stated above.
            </p>
          </Card>

          {/* How We Use Your Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Other Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use non-Pinterest information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and manage your account</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze usage patterns and trends (for our Service only)</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Personalize your experience and provide relevant content</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </Card>

          {/* Data Sharing and Disclosure */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Pinterest Data:</strong> We do not sell, rent, or share Pinterest user data with third parties 
                except where required by law. Pinterest data is strictly protected and is never shared with advertisers, 
                data brokers, or any third parties for commercial purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Other Information:</strong> We do not sell your personal information. We may share your 
                non-Pinterest information only in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our Service (under strict confidentiality agreements)</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4 text-sm bg-muted/50 p-3 rounded">
                <strong>Important:</strong> Access tokens and Pinterest authentication credentials are never shared 
                with any third parties under any circumstances.
              </p>
            </div>
          </Card>

          {/* Data Storage & Security */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Data Storage & Security
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pinterest requires strict security measures for data storage. We implement the following security practices:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li><strong>Secure Storage:</strong> All data, especially Pinterest access tokens, are stored in encrypted databases with industry-standard encryption (AES-256)</li>
              <li><strong>Encryption:</strong> Data in transit is protected using TLS/SSL encryption</li>
              <li><strong>Restricted Access:</strong> Access to Pinterest data and tokens is restricted to authorized personnel only, on a need-to-know basis</li>
              <li><strong>Access Tokens:</strong> Pinterest access tokens are stored securely and are never shared with third parties or exposed in logs</li>
              <li><strong>Regular Security Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
              <li><strong>Secure Authentication:</strong> Multi-factor authentication and secure password policies are enforced</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed text-sm bg-muted/50 p-3 rounded">
              <strong>Note:</strong> While we implement industry-standard security measures, no method of transmission 
              over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we 
              are committed to protecting your data to the best of our ability.
            </p>
          </Card>

          {/* User Control & Data Deletion - MANDATORY */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">User Control & Data Deletion (MANDATORY)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Pinterest requires that you have full control over your data.</strong> You have the following rights:
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Revoke Pinterest Access</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  You can revoke Pinterest access at any time through either method:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>From Pinterest:</strong> Go to your Pinterest account settings → Apps → Revoke access for PinAuto</li>
                  <li><strong>From Our Service:</strong> Go to your account settings in PinAuto and disconnect your Pinterest account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Delete Your Data</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Upon your request, we will delete all associated Pinterest data, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Pinterest access tokens</li>
                  <li>Pinterest account information</li>
                  <li>Pins, boards, and analytics data we have stored</li>
                  <li>All other Pinterest-related data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  <strong>To request data deletion:</strong> Contact us at privacy@pinauto.com or support@pinauto.com. 
                  We will process your request within 30 days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Other Rights</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Depending on your location, you may also have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Opt-out:</strong> Opt-out of certain data processing activities</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm bg-background p-3 rounded border border-border">
              <strong>Important:</strong> We do not store Pinterest data longer than needed. Data is automatically 
              deleted when you disconnect your account or after a reasonable retention period if your account is inactive.
            </p>
          </Card>

          {/* Cookies & Tracking */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use cookies to improve user experience and analyze usage of our Service. Cookies help us 
              remember your preferences and provide a better experience. You can instruct your browser to refuse 
              all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you 
              may not be able to use some portions of our Service.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
              <strong>Note:</strong> We do not use cookies to track your Pinterest activity outside of our Service.
            </p>
          </Card>

          {/* Compliance with Pinterest Terms */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">Compliance with Pinterest Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our use of Pinterest data complies with the Pinterest Developer Terms and API policies. We are committed to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Following all Pinterest API guidelines and best practices</li>
              <li>Respecting user privacy and data protection requirements</li>
              <li>Using Pinterest data only for the purposes explicitly stated in this policy</li>
              <li>Not storing Pinterest data longer than necessary</li>
              <li>Allowing users to easily disconnect their accounts</li>
              <li>Providing clear information about data collection and usage</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For more information about Pinterest's policies, please visit: 
              <a href="https://developers.pinterest.com/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                https://developers.pinterest.com/policy/
              </a>
            </p>
          </Card>

          {/* Third-Party Links */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service may contain links to third-party websites or services. We are not responsible for the 
              privacy practices of these third parties. We encourage you to read the privacy policies of any 
              third-party sites you visit.
            </p>
          </Card>

          {/* Children's Privacy */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect 
              personal information from children. If you become aware that a child has provided us with personal 
              information, please contact us immediately.
            </p>
          </Card>

          {/* Policy Updates */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy from time to time. Changes will be posted on this page with an updated 
              "Last updated" date. We will notify you of any material changes via email or through a notice on 
              our Service. You are advised to review this Privacy Policy periodically for any changes. Your 
              continued use of our Service after any changes constitutes acceptance of the updated policy.
            </p>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@pinauto.com</p>
              <p><strong>Support:</strong> support@pinauto.com</p>
            </div>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
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
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

