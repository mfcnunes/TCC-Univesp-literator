import type { Book } from '../types';

export async function searchBooks(query: string): Promise<Book[]> {
  const urlBusca = ['https:', '', 'openlibrary.org', 'search.json'].join('/');
  const params = new URLSearchParams({
    q: query,
    limit: '20',
  });

  const response = await fetch(urlBusca + '?' + params.toString());

  if (!response.ok) {
    throw new Error('Erro ' + response.status + ' ao buscar livros.');
  }

  const data = await response.json();

  return (data.docs ?? []).map((doc: any) => {
    const id = doc.key ? doc.key.replace('/works/', '') : String(Math.random());
    const title = doc.title ?? 'Título não informado';
    const authors = doc.author_name ?? ['Autor não informado'];
    const authorText = Array.isArray(authors) ? authors.join(', ') : String(authors);

    const cover = doc.cover_i
      ? ['https:', '', 'covers.openlibrary.org', 'b', 'id', doc.cover_i + '-M.jpg'].join('/')
      : '';

   const amazonBase = 'https://' + 'www.' + 'amazon.com.br/s';
    const amazonLink = amazonBase + '?k=' + encodeURIComponent(title + ' ' + authorText);

    const infoLink = doc.key
      ? ['https:', '', 'openlibrary.org'].join('/') + doc.key
      : undefined;

    return {
      id,
      title,
      authors,
      cover,
      description: '',
      publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : '',
      infoLink,
      amazonLink,
    };
  });
}
