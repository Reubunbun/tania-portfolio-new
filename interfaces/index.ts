import type { NextPage } from 'next';

export type Page = NextPage & {
    title: string;
    safeHydrate?: boolean;
};

export type Image = {
    id: number;
    url: string;
    title: string;
    description: string;
    tags: string[];
    priority: number;
    width: number;
    height: number;
};

export enum ScreenType {
    mobile,
    tablet,
    smallDesktop,
    desktop,
};

export enum Direction {
    Forward,
    Backward,
};

/**
 * API RESPONSES
 */
export type GenericError = {
    message: string;
};

export type ImagesData = {
    images: Image[];
    tags: string[];
    totalCount: number;
};
