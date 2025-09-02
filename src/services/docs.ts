import http from '@/services/http.ts'
import type { UserDocsGetQuery, UserDocsItem } from '@/interfaces/docs.interfaces.ts'
export class DocsService {
  static getUserDocs(params: UserDocsGetQuery) {
    return http.get<Array<UserDocsItem>>('/user/docs', { params })
  }
}
