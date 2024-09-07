import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-view-post',
    template: `
        <div class="max-w-xl mx-auto bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-700">
                <p class="text-sm text-gray-300 leading-relaxed">{{ data.caption }}</p>
            </div>
            <div class="w-full h-auto">
                <img [src]="data?.image?.url" alt="{{ data.caption }}"
                     class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
            <div mat-dialog-actions
                 class="flex justify-between items-center p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
        <span class="text-sm text-gray-400 flex items-center space-x-1">
            <span>{{ data?.liked?.length }}</span>
        </span>
                <div class="flex items-center space-x-4">
                    <button mat-icon-button aria-label="Like"
                            class="text-white hover:text-red-500 transition duration-300 ease-in-out">
                        <mat-icon>favorite</mat-icon>
                    </button>
                    <button mat-icon-button aria-label="Comment"
                            class="text-white hover:text-blue-400 transition duration-300 ease-in-out">
                        <mat-icon>comment</mat-icon>
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class ViewPostComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        console.log("Data from :", data)
    }

    ngOnInit(): void {
    }

}
