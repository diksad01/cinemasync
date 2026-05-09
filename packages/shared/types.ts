export interface User {
  id: string
  name: string
  color?: string
  avatar?: string
}

export interface Room {
  roomId: string
  videoUrl: string | null
  videoType: string | null
  users: User[]
  createdAt: number
  hostId: string
  currentTime: number
  isPlaying: boolean
  lastUpdate: number
}

export interface ChatMessage {
  id: string
  userId: string
  name: string
  text: string
  color?: string
  timestamp: number
  isSystem?: boolean
  isReaction?: boolean
}

export interface SyncState {
  isPlaying: boolean
  currentTime: number
  updatedAt: number
}

export interface ServerToClientEvents {
  room_created:       (data: { roomId: string; videoUrl: string | null }) => void
  room_joined:        (data: { room: Room }) => void
  room_state:         (data: { videoUrl: string | null; videoType: string | null; currentTime: number; isPlaying: boolean; users: User[] }) => void
  room_users:         (data: User[]) => void
  user_joined:        (data: { name: string; id: string }) => void
  user_left:          (data: { name: string; id: string }) => void
  chat_msg:           (data: { message: string; userName: string; color: string; timestamp: number; id: string }) => void
  sync_play:          (data: { currentTime: number; from: string }) => void
  sync_pause:         (data: { currentTime: number; from: string }) => void
  sync_seek:          (data: { currentTime: number; from: string }) => void
  sync_url:           (data: { url: string; videoType: string; from: string }) => void
  sync_buffer:        (data: { buffering: boolean; from: string }) => void
  reaction:           (data: { emoji: string; from: string; id: string }) => void
  host_info:          (data: { hostSocketId: string }) => void
  request_state_sync: () => void
  countdown_start:    (data: { from: string }) => void
  kicked:             () => void
  muted:              (data: { mute: boolean }) => void
  typing:             (data: { userName: string; isTyping: boolean; id: string }) => void
  room_upload:        (data: { fileName: string }) => void
  error:              (data: { message: string }) => void
  // WebRTC
  webrtc_offer:       (data: { offer: RTCSessionDescriptionInit; from: string }) => void
  webrtc_answer:      (data: { answer: RTCSessionDescriptionInit; from: string }) => void
  webrtc_ice:         (data: { candidate: RTCIceCandidateInit; from: string }) => void
  webrtc_stop:        (data: { from: string }) => void
}

export interface ClientToServerEvents {
  join:               (data: { roomCode: string; userName: string; userColor?: string; password?: string }) => void
  leave_room:         (data: { roomId: string }) => void
  chat_msg:           (data: { message: string; userName: string }) => void
  sync_play:          (data: { currentTime: number }) => void
  sync_pause:         (data: { currentTime: number }) => void
  sync_seek:          (data: { currentTime: number }) => void
  sync_url:           (data: { url: string; videoType: string }) => void
  sync_buffer:        (data: { buffering: boolean }) => void
  reaction:           (data: { emoji: string }) => void
  typing:             (data: { isTyping: boolean }) => void
  countdown_start:    () => void
  host_kick:          (data: { targetId: string }) => void
  host_mute:          (data: { targetId: string; mute: boolean }) => void
  queue_add:          (data: { url: string }) => void
  // WebRTC
  webrtc_offer:       (data: { offer: RTCSessionDescriptionInit }) => void
  webrtc_answer:      (data: { answer: RTCSessionDescriptionInit }) => void
  webrtc_ice:         (data: { candidate: RTCIceCandidateInit }) => void
  webrtc_stop:        () => void
}

// Chrome extension message passing
export type BackgroundMessage =
  | { type: 'CREATE_ROOM'; videoUrl: string; userName: string }
  | { type: 'JOIN_ROOM';   roomId: string;   userName: string }
  | { type: 'SEND_CHAT';   roomId: string;   name: string; text: string }
  | { type: 'SEND_REACTION'; roomId: string; name: string; emoji: string }
  | { type: 'SYNC_PLAY';   roomId: string;   time: number }
  | { type: 'SYNC_PAUSE';  roomId: string;   time: number }
  | { type: 'SYNC_SEEK';   roomId: string;   time: number }
  | { type: 'GET_STATE' }

export type ContentMessage =
  | { type: 'SYNC_PLAY';   time: number }
  | { type: 'SYNC_PAUSE';  time: number }
  | { type: 'SYNC_SEEK';   time: number }
  | { type: 'CHAT_MSG';    name: string; text: string; isReaction?: boolean }
  | { type: 'USER_JOINED'; user: User }
  | { type: 'USER_LEFT';   name: string }
  | { type: 'ROOM_USERS';  users: User[] }
  | { type: 'ROOM_CREATED'; roomId: string; videoUrl: string }
  | { type: 'STATE';        roomId: string | null; users: User[] }
