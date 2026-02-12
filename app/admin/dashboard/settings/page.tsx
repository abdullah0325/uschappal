"use client"
import React, { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Settings, Store, Mail } from "lucide-react"

export default function SettingsManagement() {
  const [settings, setSettings] = useState({
    storeName: "US Chappal Umarzai",
    storeDescription: "Premium handcrafted traditional footwear",
    email: "admin@abdullahchappalstore.com",
    phone: "+92 300 1234567",
    address: "Umarzai, Peshawar, Pakistan",
    website: "https://abdullahchappalstore.com",
    currency: "PKR",
    taxRate: 0,
    shippingEnabled: true,
    freeShippingThreshold: 5000,
    maintenanceMode: false,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  // Admin credentials state
  const [adminUsername, setAdminUsername] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  // Fetch current admin username on mount
  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/admin/get-username")
        if (res.ok) {
          const data = await res.json()
          setAdminUsername(data.username || "")
        }
      } catch {}
    }
    fetchAdmin()
  }, [])
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpSending, setOtpSending] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpVerifying, setOtpVerifying] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [updatingCreds, setUpdatingCreds] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert("Settings saved successfully!")
    } catch (error) {
      alert("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setSettings(prev => {
      const parentValue = prev[parent as keyof typeof prev]
      if (typeof parentValue === 'object' && parentValue !== null) {
        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [field]: value
          }
        }
      }
      return prev
    })
  }

  const handleSendOtp = async () => {
    setOtpSending(true)
    setOtpError("")
    try {
      const response = await fetch("/api/admin/send-otp", {
        method: "POST",
      })
      if (response.ok) {
        setOtpSent(true)
      } else {
        setOtpError("Failed to send OTP")
      }
    } catch (err) {
      setOtpError("Network error")
    } finally {
      setOtpSending(false)
    }
  }

  const handleVerifyOtp = async () => {
    setOtpVerifying(true)
    setOtpError("")
    try {
      const response = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      })
      const data = await response.json()
      if (data.verified) {
        setOtpVerified(true)
      } else {
        setOtpError(data.error || "Invalid OTP")
      }
    } catch (err) {
      setOtpError("Network error")
    } finally {
      setOtpVerifying(false)
    }
  }

  const handleUpdateCredentials = async () => {
    setUpdatingCreds(true)
    setUpdateError("")
    setUpdateSuccess(false)
    try {
      const payload = { username: adminUsername, password: adminPassword, otp }
      console.log("Update credentials payload:", payload)
      const response = await fetch("/api/admin/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.success) {
        setUpdateSuccess(true)
        setAdminPassword("")
        setOtp("")
        setOtpVerified(false)
        setOtpSent(false)
        // Refetch updated username
        try {
          const res = await fetch("/api/admin/get-username")
          if (res.ok) {
            const d = await res.json()
            setAdminUsername(d.username || "")
          }
        } catch {}
      } else {
        setUpdateError(data.error || "Failed to update credentials")
      }
    } catch (err) {
      setUpdateError("Network error")
    } finally {
      setUpdatingCreds(false)
    }
  }

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your store settings and preferences</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Admin Credentials Section */}
        <Card className="bg-amber-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Admin Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newUsername">New Username</Label>
              <Input id="newUsername" value={adminUsername} onChange={e => setAdminUsername(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="mt-1" />
            </div>
            <div className="flex gap-2 items-center">
              <Button type="button" className="bg-primary" disabled={otpSending} onClick={handleSendOtp}>
                {otpSending ? "Sending..." : "Send Verification Code"}
              </Button>
              {otpSent && <span className="text-green-600 text-sm">Code sent to uschappal@gmail.com</span>}
            </div>
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input id="otp" value={otp} onChange={e => setOtp(e.target.value)} className="mt-1" />
              <Button type="button" className="mt-2 bg-primary" disabled={otpVerifying} onClick={handleVerifyOtp}>
                {otpVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
              {otpVerified && <span className="text-green-600 text-sm ml-2">Verified!</span>}
              {otpError && <span className="text-red-600 text-sm ml-2">{otpError}</span>}
            </div>
            <Button type="button" className="bg-primary mt-4" disabled={!otpVerified || updatingCreds} onClick={handleUpdateCredentials}>
              {updatingCreds ? "Updating..." : "Save Admin Credentials"}
            </Button>
            {updateSuccess && <span className="text-green-600 text-sm ml-2">Credentials updated!</span>}
            {updateError && <span className="text-red-600 text-sm ml-2">{updateError}</span>}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Information */}
          <Card className="bg-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Input
                  id="storeDescription"
                  value={settings.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Store Address</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card className="bg-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Business Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shippingEnabled">Enable Shipping</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to place orders</p>
                </div>
                <Switch
                  id="shippingEnabled"
                  checked={settings.shippingEnabled}
                  onCheckedChange={(checked) => handleInputChange("shippingEnabled", checked)}
                />
              </div>
              <div>
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (Rs.)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange("freeShippingThreshold", parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable the store</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                />
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base font-medium">Notification Preferences</Label>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => handleNestedInputChange("notifications", "email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => handleNestedInputChange("notifications", "sms", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => handleNestedInputChange("notifications", "push", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Store Status</p>
                  <p className="text-lg font-semibold">
                    {settings.maintenanceMode ? "Maintenance" : "Active"}
                  </p>
                </div>
                <Badge variant={settings.maintenanceMode ? "destructive" : "default"}>
                  {settings.maintenanceMode ? "Offline" : "Online"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shipping</p>
                  <p className="text-lg font-semibold">
                    {settings.shippingEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <Badge variant={settings.shippingEnabled ? "default" : "secondary"}>
                  {settings.shippingEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Free Shipping</p>
                  <p className="text-lg font-semibold">
                    Rs. {settings.freeShippingThreshold.toLocaleString()}+
                  </p>
                </div>
                <Badge variant="outline">
                  Threshold
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}