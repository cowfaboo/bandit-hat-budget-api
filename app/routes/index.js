const budgetRoutes = require('./budget_routes');

module.exports = function(app, db) {
  budgetRoutes(app, db);
  // Other route groups could go here, in the future
};