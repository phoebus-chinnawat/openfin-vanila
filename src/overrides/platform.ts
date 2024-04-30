import * as WorkspacePlatform from '@openfin/workspace-platform';
import type OpenFin from '@openfin/core';

export function InitWorkspaceOverrideCallback(): WorkspacePlatform.WorkspacePlatformOverrideCallback {
    return (workspacePlatformProvider: OpenFin.Constructor<WorkspacePlatform.WorkspacePlatformProvider>) => {
         class WorkspaceAppOverride extends workspacePlatformProvider {
            async createWindow(options: OpenFin.PlatformWindowCreationOptions, identity?: OpenFin.Identity): Promise<OpenFin.Window> {
                console.log(`createWindow`, JSON.stringify(options, null, 4), JSON.stringify(identity, null, 4));
                return await super.createWindow(options, identity);
            }
  
            async createView(payload: OpenFin.CreateViewPayload, identity: OpenFin.Identity): Promise<OpenFin.View> {
              console.log(`createView`, JSON.stringify(payload, null, 4), JSON.stringify(identity, null, 4));
                return await super.createView(payload, identity);
            }
  
            async replaceLayout(payload: OpenFin.ReplaceLayoutPayload, identity?: OpenFin.Identity): Promise<void> {
              console.log(`replaceLayout`, JSON.stringify(payload, null, 4), JSON.stringify(identity, null, 4));
                await super.replaceLayout(payload, identity);
            }
  
            async closeWindow(payload: OpenFin.CloseWindowPayload, callerIdentity: OpenFin.Identity): Promise<void> {
                await super.closeWindow(payload, callerIdentity);
            }
  
            async openPageTabContextMenu(req: WorkspacePlatform.OpenPageTabContextMenuPayload, callerIdentity: OpenFin.Identity): Promise<void> {
                console.log(`openPageTabContextMenu`, JSON.stringify(req, null, 4), JSON.stringify(callerIdentity, null, 4));
                await super.openPageTabContextMenu(req, callerIdentity);
            }
  
            async openGlobalContextMenu(req: WorkspacePlatform.OpenGlobalContextMenuPayload, callerIdentity: OpenFin.Identity): Promise<void> {
                console.log(`openGlobalContextMenu`, JSON.stringify(req, null, 4), JSON.stringify(callerIdentity, null, 4));
                await super.openGlobalContextMenu(req, callerIdentity);
            }
  
            async quit(payload: undefined, identity: OpenFin.Identity): Promise<void> {
                await super.quit(payload, identity);
            }
  
            async createSavedWorkspace(req: WorkspacePlatform.CreateSavedWorkspaceRequest): Promise<void> {
              console.log('createSavedWorkspace', req);
              await super.createSavedWorkspace(req);
            }
  
            async createSavedPage(req: WorkspacePlatform.CreateSavedPageRequest): Promise<void> {
              console.log('createSavedPage', req);
              await super.createSavedPage(req);
            }
  
            getSavedPage(id: string): Promise<WorkspacePlatform.Page> {
              console.log('getSavedPage', id);
              return super.getSavedPage(id);
            }
  
            getSavedWorkspace(id: string): Promise<WorkspacePlatform.Workspace> {
              console.log('getSavedWorkspace', id);
              return super.getSavedWorkspace(id);
            }
        }
        return new WorkspaceAppOverride();
    };
  }