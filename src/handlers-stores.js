const { nanoid } = require('nanoid');
const stores = require('./stores');

const addStoreHandler = (request, h) => {
  // getting body request in Hapi using request.payload
  const { storeName, address } = request.payload;
  const id = nanoid(16);

  // property already complete, then push into array stores
  const newStore = {
    id, storeName, address,
  };

  stores.push(newStore);

  // check if id are available
  const isIdFound = stores.filter((store) => store.id === id).length > 0;

  // condition if store have added to array stores
  if (isIdFound) {
    const response = h.response({
      status: 'success',
      message: 'store has been successfully added',
      data: {
        storeId: id,
      },
    });
    response.code(201);
    return response;
  }

  // condition if store are not added to array stores
  const response = h.response({
    status: 'fail',
    message: 'store failed to add',
  });
  response.code(500);
  return response;
};

const getAllStoresHandler = () => ({
  status: 'success',
  data: {
    stores: stores.map((store) => ({
      name: store.storeName,
      address: store.address,
    })),
  },
});

const getStoreByIdHandler = (request, h) => {
  // getting id from request parameter
  const { id } = request.params;

  // getting store object by id filtering
  const store = stores.filter((s) => s.id === id)[0];

  // conditioning if there is store
  if (store !== undefined) {
    return {
      status: 'success',
      data: {
        store,
      },
    };
  }

  // response if store can not be found
  const response = h.response({
    status: 'fail',
    message: 'store can not be found!',
  });
  response.code(404);
  return response;
};

const editStoreByIdHandler = (request, h) => {
  const { id } = request.params;

  const { storeName, address } = request.payload;

  // indexing array to update the store (catching the id)
  const index = stores.findIndex((store) => store.id === id);

  // condition if index is true
  if (index !== -1) {
    stores[index] = {
      ...stores[index],
      storeName,
      address,
    };

    const response = h.response({
      status: 'success',
      message: 'store has been successfully edited',
    });
    response.code(200);
    return response;
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to edit the store, id can\'t be found',
  });
  response.code(404);
  return response;
};

const deleteStoreByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = stores.findIndex((store) => store.id === id);

  // condition if index is available
  if (index !== -1) {
    stores.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'store has been successfully deleted',
    });
    response.code(200);
    return response;
  }

  // response if fail
  const response = h.response({
    status: 'fail',
    message: 'failed to delete the store, id can\'t be found',
  });
  response.code(404);
  return response;
};

module.exports = {
  addStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  editStoreByIdHandler,
  deleteStoreByIdHandler,
};
