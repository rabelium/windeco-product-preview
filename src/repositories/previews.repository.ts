import { PreviewFormData, PreviewInterface } from './types'
import { AbstractRepository } from './abstract.repository'
import { MaterialSetup } from '../material/types'

class PreviewsRepositoryClass extends AbstractRepository<PreviewInterface, PreviewFormData> {
  constructor() {
    super('previews')
  }

  create(data: PreviewFormData): Promise<PreviewInterface> {
    return this.client.post(this.base, this.toFormData(data)).then(({ data }) => data)
  }

  get(id: string): Promise<PreviewInterface> {
    return this.client.get(`${this.base}/${id}/details`).then(({ data }) => data)
  }

  product(id: string, hide?: string[]): Promise<string> {
    const params = {
      hide: hide?.join(';'),
    }
    return this.client.get(`${this.base}/${id}`, { params }).then(({ data }) => data)
  }

  environment(id: string, hide?: string[]): Promise<string> {
    const params = {
      hide: hide?.join(';'),
    }
    return this.client.get(`${this.base}/${id}/environment`, { params }).then(({ data }) => data)
  }

  getPreviewRender(
    id: string,
    materials?: Record<string, MaterialSetup>,
    hidden?: string[],
    environment?: boolean,
  ): string {
    const params = this.encode(JSON.parse(JSON.stringify({ m: materials, h: hidden, e: environment })))

    const url = new URL(`${this.client.getUri()}/${this.base}/${id}/render`)
    url.searchParams.append('p', params)
    return url.toString()
  }
}

export const PreviewsRepository = new PreviewsRepositoryClass()
