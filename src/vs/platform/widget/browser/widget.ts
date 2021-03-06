/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { IContextKeyService, RawContextKey, IContextKeyServiceTarget } from 'vs/platform/contextkey/common/contextkey';

export function createWidgetScopedContextKeyService(contextKeyService: IContextKeyService, widget: IContextScopedWidget, contextKey: string): IContextKeyService {
	const result = contextKeyService.createScoped(widget.target);
	const widgetContext = new RawContextKey<IContextScopedWidget>(contextKey, widget);
	widgetContext.bindTo(result);
	return result;
}

export function getContextScopedWidget<T extends IContextScopedWidget>(contextKeyService: IContextKeyService, contextKey: string): T {
	return contextKeyService.getContext(document.activeElement).getValue(contextKey);
}

export interface IContextScopedWidget {

	readonly target: IContextKeyServiceTarget;

}