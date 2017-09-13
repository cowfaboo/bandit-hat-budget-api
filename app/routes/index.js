const categoryRoutes = require('./category_routes');
const expenseRoutes = require('./expense_routes');
const userRoutes = require('./user_routes');
const groupRoutes = require('./group_routes');

module.exports = function(app) {
  categoryRoutes(app);
  expenseRoutes(app);
  userRoutes(app);
  groupRoutes(app);
};