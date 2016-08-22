import { Auth0Widget, IdentityService } from './IdentityService';
import InventoryService from './InventoryService';

export const auth0Widget = new Auth0Widget('jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO', 'ocelot-saas.eu.auth0.com');
export const identityService = new IdentityService('jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO', 'ocelot-saas.eu.auth0.com', 'localhost:10001');
export const inventoryService = new InventoryService('localhost:10002', identityService);
