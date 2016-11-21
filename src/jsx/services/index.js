import { FileStorageService} from './FileStorageService';
import { Auth0Widget, IdentityService } from 'identity-sdk-js';
import { InventoryService } from 'inventory-sdk-js';

import { AUTH0_KEY, AUTH0_DOMAIN, FILESTACK_KEY, IDENTITY_SERVICE_PUBLIC_DOMAIN, INVENTORY_SERVICE_PUBLIC_DOMAIN } from '../config';
import { APP_COLORS} from '../common/constants';
import LogoSingle from '../../static/img/logo-single.png';


export const auth0Widget = new Auth0Widget(AUTH0_KEY, AUTH0_DOMAIN, LogoSingle, APP_COLORS['primary']);
export const fileStorageService = new FileStorageService(FILESTACK_KEY);
export const identityService = new IdentityService(AUTH0_KEY, AUTH0_DOMAIN, IDENTITY_SERVICE_PUBLIC_DOMAIN);
export const inventoryService = new InventoryService(INVENTORY_SERVICE_PUBLIC_DOMAIN);
