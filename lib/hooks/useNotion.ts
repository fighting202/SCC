import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getDatabases, 
  getDatabaseById, 
  createDatabase, 
  updateDatabaseProperties,
  deleteDatabase,
  getDatabasePagesById,
  searchDatabasesByQuery,
  duplicateDatabase
} from '@/app/actions/notion-database'
import { 
  getPages, 
  getPageById, 
  createPage, 
  updatePageProperties,
  deletePage,
  getPageBlocksById,
  searchPagesByQuery,
  duplicatePage,
  movePageToDatabase,
  updatePageSharing
} from '@/app/actions/notion-pages'
import type { 
  DatabaseInput, 
  PageInput, 
  DatabasePropertiesUpdate, 
  PagePropertiesUpdate,
  ServerActionResponse,
  NotionDatabase,
  NotionPage
} from '@/lib/scc_types'

// 데이터베이스 관련 훅들
export function useDatabases() {
  return useQuery({
    queryKey: ['notion', 'databases'],
    queryFn: async () => {
      const result = await getDatabases()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    staleTime: 5 * 60 * 1000, // 5분
  })
}

export function useDatabase(databaseId: string) {
  return useQuery({
    queryKey: ['notion', 'databases', databaseId],
    queryFn: async () => {
      const result = await getDatabaseById(databaseId)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!databaseId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDatabasePages(databaseId: string, pageSize = 100) {
  return useQuery({
    queryKey: ['notion', 'databases', databaseId, 'pages'],
    queryFn: async () => {
      const result = await getDatabasePagesById(databaseId, pageSize)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!databaseId,
    staleTime: 2 * 60 * 1000, // 2분
  })
}

export function useSearchDatabases(query: string) {
  return useQuery({
    queryKey: ['notion', 'databases', 'search', query],
    queryFn: async () => {
      const result = await searchDatabasesByQuery(query)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  })
}

// 데이터베이스 뮤테이션 훅들
export function useCreateDatabase() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: DatabaseInput) => createDatabase(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases'] })
    },
  })
}

export function useUpdateDatabase() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ databaseId, properties }: { databaseId: string; properties: DatabasePropertiesUpdate }) =>
      updateDatabaseProperties(databaseId, properties),
    onSuccess: (_, { databaseId }) => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases'] })
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases', databaseId] })
    },
  })
}

export function useDeleteDatabase() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (databaseId: string) => deleteDatabase(databaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases'] })
    },
  })
}

export function useDuplicateDatabase() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ databaseId, newTitle }: { databaseId: string; newTitle?: string }) =>
      duplicateDatabase(databaseId, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases'] })
    },
  })
}

// 페이지 관련 훅들
export function usePages() {
  return useQuery({
    queryKey: ['notion', 'pages'],
    queryFn: async () => {
      const result = await getPages()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function usePage(pageId: string) {
  return useQuery({
    queryKey: ['notion', 'pages', pageId],
    queryFn: async () => {
      const result = await getPageById(pageId)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!pageId,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePageBlocks(pageId: string) {
  return useQuery({
    queryKey: ['notion', 'pages', pageId, 'blocks'],
    queryFn: async () => {
      const result = await getPageBlocksById(pageId)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!pageId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useSearchPages(query: string) {
  return useQuery({
    queryKey: ['notion', 'pages', 'search', query],
    queryFn: async () => {
      const result = await searchPagesByQuery(query)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  })
}

// 페이지 뮤테이션 훅들
export function useCreatePage() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: PageInput) => createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages'] })
    },
  })
}

export function useUpdatePage() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ pageId, properties }: { pageId: string; properties: PagePropertiesUpdate }) =>
      updatePageProperties(pageId, properties),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages'] })
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages', pageId] })
    },
  })
}

export function useDeletePage() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (pageId: string) => deletePage(pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages'] })
    },
  })
}

export function useDuplicatePage() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ pageId, newTitle }: { pageId: string; newTitle?: string }) =>
      duplicatePage(pageId, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages'] })
    },
  })
}

export function useMovePage() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ pageId, databaseId }: { pageId: string; databaseId: string }) =>
      movePageToDatabase(pageId, databaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages'] })
      queryClient.invalidateQueries({ queryKey: ['notion', 'databases'] })
    },
  })
}

export function useUpdatePageSharing() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ pageId, publicAccess }: { pageId: string; publicAccess: boolean }) =>
      updatePageSharing(pageId, publicAccess),
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ['notion', 'pages', pageId] })
    },
  })
}

// 유틸리티 훅들
export function useNotionData() {
  const databases = useDatabases()
  const pages = usePages()
  
  return {
    databases,
    pages,
    isLoading: databases.isLoading || pages.isLoading,
    error: databases.error || pages.error,
  }
}

export function useRefreshNotionData() {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['notion'] })
  }
}
