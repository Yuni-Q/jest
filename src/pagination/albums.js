import $ from 'jquery';
import Pagination from '../libs/tui-pagination';
import {fetchAlbums} from './api';

let $tbody, pagination, pageSize;

function genTableRowHTML(row) {
  return `
    <tr data-testid="row">
      <th class="id" scope="row">${row.id}</th>
      <td class="name">${row.name}</td>
      <td class="artist">${row.artist}</td>
      <td class="release">${row.release}</td>
    </tr>
  `;
}

function renderContainer($container) {
  $container.html(`
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Release</th>
        </tr>
      </thead>
      <tbody data-testid="rows-wrap"></tbody>
    </table>
    <div data-testid="pagination" class="pages tui-pagination"></div>
  `);
}

function renderTbody(albums) {
  $tbody.html(albums.map(genTableRowHTML).join(''));
}

function fetchAndReset(pageNo, reset) {
  return fetchAlbums(pageNo, pageSize).then(res => {
    const {albums, total} = res.data;

    renderTbody(albums);
    if (reset) {
      pagination.reset(total);
    } else {
      pagination.setTotalItems(total);
    }
  });
}

export function init(container, size) {
  pageSize = size;

  const $container = $(container);
  renderContainer($container);
  $tbody = $container.find('.table > tbody');
  pagination = new Pagination($container.find('.pages'), {
    itemsPerPage: pageSize,
    totalItems: 0
  });

  // 첫페이지 로드
  fetchAndReset(1, true);

  // 페이지 변경시 갱신
  pagination.on('beforeMove', (ev) => {
    fetchAndReset(ev.page);
  });
}
