import test from 'node:test';
import assert from 'node:assert/strict';
import { isSidebarItemActive } from './sidebarUtils.js';

test('marks a problem as active when the current route is problem.edit', () => {
    const item = {
        route: 'problem.show',
        params: { id: 42 },
    };

    assert.equal(
        isSidebarItemActive(item, 'problem.edit', { id: '42' }),
        true,
    );
});

test('does not mark a problem as active when the route id differs', () => {
    const item = {
        route: 'problem.show',
        params: { id: 42 },
    };

    assert.equal(
        isSidebarItemActive(item, 'problem.edit', { id: '99' }),
        false,
    );
});
