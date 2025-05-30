// Utility to create a reference object from an array
exports.createRef = (array, key, value) => {
  return array.reduce((ref, item) => {
    ref[item[key]] = item[value];
    return ref;
  }, {});
};

// Utility to format search history data for seeding
exports.formatSearchHistory = (searchHistoryData, userIdLookup) => {
  return searchHistoryData.map(({ city, searched_at, username }) => ({
    city,
    searched_at,
    user_id: userIdLookup[username]
  }));
};
