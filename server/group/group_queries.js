'use strict';

var qGetGroupInfo = function (email, groupId) {
  var query =
  "SELECT g.*\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON u.id = g.user_id\n" +
  "WHERE g.id = '" + groupId + "'\n"
  "AND (u.email = '" + email + "' OR g.is_public = 1);";

  return query;
};

var qEditGroupInfo = function (email, groupId, groupData) {
  if (groupData.isPublic === true) {
    groupData.isPublic = 1;
  } else {
    groupData.isPublic = 0;
  }

  if (groupData.deleted === true) {
    groupData.deleted = 1;
  } else {
    groupData.deleted = 0;
  }

  var query =
  "UPDATE dbo.groups\n" +
  "SET name = '" + groupData.name + "',\n" +
  "description = '" + groupData.description + "',\n" +
  "deleted = " + groupData.deleted + ",\n" +
  "is_public = " + groupData.isPublic + "\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND g.id = " + groupId + ";";

  return query;
};

var qGetData = function(groupId) {
  var query =
  "SELECT g.id as groupId, g.name as groupName, g.description as description, k.id as kiwiId, k.title as kiwiTitle, kv.date as date, kv.value as value\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.groups g\n" +
  "ON u.id = g.user_id\n" +
  "LEFT JOIN dbo.kiwi_group kg\n" +
  "ON kg.group_id = g.id\n" +
  "LEFT JOIN dbo.kiwis k\n" +
  "ON k.id = kg.kiwi_id\n" +
  "LEFT JOIN dbo.kiwi_values kv\n" +
  "ON k.id = kv.kiwi_id\n" +
  "WHERE g.id = " + groupId + "\n" +
  "AND g.is_public = 1\n" +
  "ORDER BY k.id;";

  return query;
}

var qAddKiwiToGroup = function (groupId, kiwiId) {
  var query =
  "INSERT INTO dbo.kiwi_group (group_id, kiwi_id)\n" +
  "VALUES (" + groupId + "," + kiwiId + ");";

  return query;
};

var qRemoveKiwiFromGroup = function (groupId, kiwiId) {
  var query = 
  "DELETE dbo.kiwi_group\n" +
  "WHERE group_id = " + groupId + "\n" +
  "AND kiwi_id = " + kiwiId + ";";
  console.log(query);
  return query;
};

var qGetKiwisOfGroup = function (groupId) {
  var query =
  "SELECT k.id, k.title\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.kiwi_group kg\n" +
  "ON k.id = kg.kiwi_id\n" +
  "WHERE kg.group_id = " + groupId + ";";

  return query;
};

var qLookupGroup = function (email, groupData) {
  var query =  
  "SELECT *\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND g.name = '" + groupData.name + "';";

  return query;
};

var qCreateGroup = function (email, groupData) {
  var query =
  "INSERT INTO dbo.groups (user_id, name, description)\n" +
  "SELECT u.id, '" + groupData.name + "', '" + (groupData.description || '') + "'\n" +
  "FROM dbo.users u\n" +
  "WHERE u.email = '" + email + "';\n"

  return query;
};

var qRemoveGroup = function (email, groupId) {
  var query =
  "UPDATE dbo.groups\n" +
  "SET deleted = 1\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON u.id = g.user_id\n" + 
  "WHERE g.id = " + groupId + " \n"
  "AND u.email = '" + email + "';";

  return query;
};


var queries = {
  getGroupInfo: qGetGroupInfo,
  editGroupInfo: qEditGroupInfo,
  getData: qGetData,
  getKiwisOfGroup: qGetKiwisOfGroup,
  addKiwiToGroup: qAddKiwiToGroup,
  removeKiwiFromGroup: qRemoveKiwiFromGroup,
  lookupGroup: qLookupGroup,
  createGroup: qCreateGroup,
  removeGroup: qRemoveGroup
};

module.exports = queries;
