import { parseElementSchema } from '@ideal-schema/playground-parser'

export function useCrudLogicCode(type: 'dialog' | 'page' = 'page') {
  const { config, columns } = parseElementSchema('code', 'crud')

  if (config.request) {
    return `
    function getTableData(params: any) {
      console.log(params, 'getTableData params')
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = [
            {
              id: 1,
              name: 'Steven',
              gender: 'male',
              age: 22,
              time: '2020-01-01',
            },
            {
              id: 2,
              name: 'Helen',
              gender: 'male',
              age: 12,
              time: '2012-01-01',
            },
            {
              id: 3,
              name: 'Nancy',
              gender: 'female',
              age: 18,
              time: '2018-01-01',
            },
            {
              id: 4,
              name: 'Jack',
              gender: 'male',
              age: 28,
              time: '2028-01-01',
            },
          ]

          resolve({
            data: {
              page: 1,
              pageSize: 2,
              total: 4,
              list: ${config.pagination ? 'data.slice((config.pagination.page - 1) * config.pagination.pageSize, config.pagination.page * config.pagination.pageSize)' : 'data'},
            },
          })
        }, 100)
      })
    }

    function commonApi(params: any) {
      console.log(JSON.stringify(params), 'commonApi params')
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            msg: 'success',
            code: 200,
          })
        }, 100)
      })
    }
    `
  }
  return `
  const getTableData = async () => {
    config.loading = true;
    try {
      const params = {
        ${config.pagination ? '...config.pagination,' : ''}
        ...config.searchFormData,
      }
      await delay(200);
      config.data = tableData;
    } catch (error) {
      console.log(error, 'getTableData error');
    }
    config.loading = false;
  }

  ${config.pagination
     ? `const handlePaginationChange = (val) => {
    config.pagination.page = val.page;
    config.pagination.pageSize = val.pageSize;
    getTableData();
  }`
: ''}

  const handleSearch = () => {
    ${config.pagination ? 'config.pagination.page = 1;' : ''}
    getTableData();
  }

  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  ${type === 'dialog' ? '' : 'getTableData();'}
  `
}
