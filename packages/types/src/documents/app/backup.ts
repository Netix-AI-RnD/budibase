import { Document } from "../document"
import { User } from "../../"

export enum AppBackupType {
  BACKUP = "backup",
  RESTORE = "restore",
}

export enum AppBackupStatus {
  STARTED = "started",
  COMPLETE = "complete",
  FAILED = "failed",
}

export enum AppBackupTrigger {
  PUBLISH = "publish",
  MANUAL = "manual",
  SCHEDULED = "scheduled",
}

export interface AppBackupContents {
  datasources: string[]
  screens: string[]
  automations: string[]
}

export interface AppBackupMetadata {
  appId: string
  trigger?: AppBackupTrigger
  type: AppBackupType
  status: AppBackupStatus
  name?: string
  createdBy?: string | User
  timestamp: string
  contents?: AppBackupContents
}

export interface AppBackup extends Document, AppBackupMetadata {
  filename?: string
}

export type AppBackupFetchOpts = {
  trigger?: AppBackupTrigger
  limit?: number
  page?: string
  paginate?: boolean
  startDate?: string
  endDate?: string
}

export interface AppBackupQueueData {
  appId: string
  docId: string
  docRev: string
  export?: {
    trigger: AppBackupTrigger
    name?: string
    createdBy?: string
  }
  import?: {
    backupId: string
    nameForBackup: string
    createdBy?: string
  }
}
