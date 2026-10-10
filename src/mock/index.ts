export * from './projects';
export * from './tasks';
export * from './team';
export * from './contacts';
export * from './leads';
export * from './siteVisits';
export * from './contracts';
export * from './quotations';

// Export any missing dummy data from the original demo-data to not break the rest of the app immediately.
// I will import the needed original demo lists here and export them.
import {
  demoActivities,
  demoPortalSettings,
  demoPortalUpdates,
  demoPortalUpdateAttachments,
  demoEntityFiles,
  demoTimeEntries,
  demoProjectInvoices,
  demoProjectGoals,
  demoTaskSuggestions,
  demoAgentActivity,
  demoProjectContacts,
  demoLeadInteractions,
  demoLeadProposals,
  demoLeadFields,
  demoLeadContacts
} from '../lib/demo-data';

export {
  demoActivities as mockActivities,
  demoPortalSettings as mockPortalSettings,
  demoPortalUpdates as mockPortalUpdates,
  demoPortalUpdateAttachments as mockPortalUpdateAttachments,
  demoEntityFiles as mockEntityFiles,
  demoTimeEntries as mockTimeEntries,
  demoProjectInvoices as mockProjectInvoices,
  demoProjectGoals as mockProjectGoals,
  demoTaskSuggestions as mockTaskSuggestions,
  demoAgentActivity as mockAgentActivity,
  demoProjectContacts as mockProjectContacts,
  demoLeadInteractions as mockLeadInteractions,
  demoLeadProposals as mockLeadProposals,
  demoLeadFields as mockLeadFields,
  demoLeadContacts as mockLeadContacts
};
