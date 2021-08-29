import AsyncStorage from '@react-native-async-storage/async-storage';

/*** COLLECT CRUD ***/
// CREATE / UPDATE COLLECT
async function saveItem(listItem, id) {
    const savedCollects = await getItems();
    listItem.id = id ? id : new Date().getTime();

    if (id) { // Update
        const index = await savedCollects.findIndex(item => item.id === id);
        savedCollects[index] = listItem;
    }
    else {  // Create
        savedCollects.push(listItem);
    }
    return AsyncStorage.setItem('collects', JSON.stringify(savedCollects));
}

// READ COLLECT
function getItems(){
    return AsyncStorage.getItem('collects')
            .then(response => {
                if(response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
}

// READ COLLECT
async function getItem(id){
    const savedCollects = await getItems();
    return savedCollects.find(item => item.id === id);
}

// DELETE COLLECT
async function deleteItem(id){
    let savedCollects = await getItems();
    const index = await savedCollects.findIndex(item => item.id === id);
    savedCollects.splice(index, 1);
    return AsyncStorage.setItem('collects', JSON.stringify(savedCollects));
}

module.exports = {
    saveItem,
    getItems,
    getItem,
    deleteItem,
}