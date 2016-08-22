import { Auth0Widget, AuthService } from './AuthService';
import InventoryService from './InventoryService';

export const auth0Widget = new Auth0Widget('jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO', 'ocelot-saas.eu.auth0.com');
export const authService = new AuthService('jhoF46qs7sSf3wcPP1lKrYRD1TSgNTZO', 'ocelot-saas.eu.auth0.com', 'localhost:10001');
export const inventoryService = new InventoryService('localhost:10002', authService);
