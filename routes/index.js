
// ADMIN SETTINGS
import roleRoutes from './admin-settings/roleRoutes.js';
import userRoutes from './admin-settings/userRoutes.js';

// SYSTEM SETTINGS
import issueTypeRoutes from './system-settings/issueTypeRoutes.js';
import projectTypeRoutes from './system-settings/projectTypeRoutes.js';
import scheduleRoutes from './system-settings/scheduleRoutes.js';
import severityTypeRoutes from './system-settings/severityTypeRoutes.js';
import statusRoutes from './system-settings/statusRoutes.js';
import deviceRoutes from './system-settings/deviceRoutes.js';
import reportRoutes from './reportRoutes.js';
import backlogRoutes from './backlogRoutes.js';

const VERSION = process.env.APP_VERSION

const createRoute = (path) => `/api/${VERSION}${path}`;

export default function Routes(app) {
    app.get(createRoute('/'), (req, res) => res.send("javaScript world!"));
    
    app.use(createRoute('/roles'), roleRoutes);
    app.use(createRoute('/users'), userRoutes);
    
    app.use(createRoute('/reports'), reportRoutes);
    app.use(createRoute('/backlogs'), backlogRoutes);

    app.use(createRoute('/issue-types'), issueTypeRoutes);
    app.use(createRoute('/project-types'), projectTypeRoutes);
    app.use(createRoute('/schedules'), scheduleRoutes);
    app.use(createRoute('/severity-types'), severityTypeRoutes);
    app.use(createRoute('/statuses'), statusRoutes);
    app.use(createRoute('/devices'), deviceRoutes);

    return app
}