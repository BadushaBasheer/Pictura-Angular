import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-view-post',
    template: `
        <div mat-dialog-content
             class=" max-w-xl mx-auto p-2 bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-700">
                <p class="text-sm text-gray-300">{{ data.caption }}</p>
            </div>
            <div class="w-full">
                <img [src]="data.image.url" alt="User Posts" class="w-full h-auto object-cover ">
            </div>
        </div>

        <div mat-dialog-actions class="flex justify-end p-4 bg-gray-800 border-t border-gray-700 rounded-b-2xl">
            <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-400">{{ data.liked.length }}</span>
                <button mat-icon-button
                        aria-label="Like"
                        class="text-white hover:text-red-500 transition-colors duration-200 ease-in-out">
                    <mat-icon>favorite</mat-icon>
                </button>

                <button mat-icon-button aria-label="Comment"
                        class="text-white hover:text-blue-400 transition-colors duration-200 ease-in-out">
                    <mat-icon>comment</mat-icon>
                </button>
            </div>
        </div>
    `,
})
export class ViewPostComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
    }

}
