import { Client } from '@notionhq/client'

declare module '@notionhq/client' {
  interface Client {
    databases: {
      retrieve: (args: any) => Promise<any>
      create: (args: any) => Promise<any>
      update: (args: any) => Promise<any>
      query: (args: any) => Promise<any>
    }
  }
}
