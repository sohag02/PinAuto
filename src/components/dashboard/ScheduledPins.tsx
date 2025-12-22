import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Image, Video, Check, X, Edit2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ScheduledPin {
  _id: string;
  title: string;
  description?: string;
  type: "image" | "video";
  scheduledTime: string;
  board: string;
  status: "pending" | "approved" | "scheduled" | "posted" | "failed";
  imageUrl: string;
  error?: string;
  createdAt: string;
}

const getStatusBadge = (status: ScheduledPin["status"]) => {
  switch (status) {
    case "pending": return <Badge variant="warning">Pending Review</Badge>;
    case "approved": return <Badge variant="success">Approved</Badge>;
    case "scheduled": return <Badge variant="info">Scheduled</Badge>;
    case "posted": return <Badge variant="success">Posted</Badge>;
    case "failed": return <Badge variant="destructive">Failed</Badge>;
  }
};

export function ScheduledPins() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPin, setEditingPin] = useState<ScheduledPin | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", board: "" });

  const { data: scheduledPins, isLoading } = useQuery({
    queryKey: ['scheduled-pins'],
    queryFn: api.pins.getAll,
  });

  const approveMutation = useMutation({
    mutationFn: api.pins.approve,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-pins'] });
      toast({
        title: "Pin approved",
        description: "The pin has been approved and queued for posting.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to approve pin",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.pins.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-pins'] });
      toast({
        title: "Pin deleted",
        description: "The scheduled pin has been removed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to delete pin",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.pins.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-pins'] });
      setEditingPin(null);
      toast({
        title: "Pin updated",
        description: "Pin content has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to update pin",
        variant: "destructive",
      });
    },
  });

  const handleEditClick = (pin: ScheduledPin) => {
    setEditingPin(pin);
    setEditForm({
      title: pin.title,
      description: pin.description || "",
      board: pin.board,
    });
  };

  const handleSaveEdit = () => {
    if (!editingPin) return;
    updateMutation.mutate({
      id: editingPin._id,
      data: editForm
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading scheduled pins...</div>;
  }

  const pins = scheduledPins || [];
  const pendingCount = pins.filter((p: ScheduledPin) => p.status === 'pending').length;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scheduled Pins</h3>
          <p className="text-sm text-muted-foreground">Review and manage upcoming pins</p>
        </div>
        <Badge variant="outline">{pendingCount} pending</Badge>
      </div>

      <div className="space-y-4">
        {pins.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No scheduled pins found</div>
        ) : (
          pins.map((pin: ScheduledPin, index: number) => (
            <div
              key={pin._id}
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-slide-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={pin.imageUrl}
                  alt={pin.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-card border border-border">
                  {pin.type === "image" ? (
                    <Image className="w-3 h-3 text-primary" />
                  ) : (
                    <Video className="w-3 h-3 text-accent" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{pin.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(pin.createdAt).toLocaleDateString()}
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{pin.board || 'No Board'}</span>
                </div>
                {pin.error && (
                  <p className="text-xs text-destructive mt-1">{pin.error}</p>
                )}
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3">
                {getStatusBadge(pin.status)}

                {pin.status === "pending" && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-success hover:text-success hover:bg-success/10"
                      onClick={() => approveMutation.mutate(pin._id)}
                      disabled={approveMutation.isPending}
                      title="Approve & Post"
                    >
                      {approveMutation.isPending ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteMutation.mutate(pin._id)}
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleEditClick(pin)}
                  disabled={pin.status === 'posted'} // Can't edit posted pins
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingPin} onOpenChange={(open) => !open && setEditingPin(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Pin Content</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="board">Pinterest Board</Label>
              <Input
                id="board"
                value={editForm.board}
                onChange={(e) => setEditForm({ ...editForm, board: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPin(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
