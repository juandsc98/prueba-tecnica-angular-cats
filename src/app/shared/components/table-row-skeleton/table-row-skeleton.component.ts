import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-table-row-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <tr class="animate-pulse">
      <!-- Raza (Imagen + Nombre) -->
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <app-skeleton type="avatar"></app-skeleton>
          </div>
          <div class="ml-4">
            <div class="mb-1">
              <app-skeleton type="text" width="140px"></app-skeleton>
            </div>
            <div>
              <app-skeleton type="text" width="90px"></app-skeleton>
            </div>
          </div>
        </div>
      </td>

      <!-- Origen -->
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm">
          <app-skeleton type="text" width="120px"></app-skeleton>
        </div>
      </td>

      <!-- Temperamento -->
      <td class="px-6 py-4">
        <div class="text-sm max-w-xs">
          <app-skeleton type="text" width="250px"></app-skeleton>
        </div>
      </td>

      <!-- Vida -->
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm">
          <app-skeleton type="text" width="80px"></app-skeleton>
        </div>
      </td>

            <!-- Características -->
      <td class="px-6 py-4">
        <div class="flex flex-wrap gap-1">
          <app-skeleton type="text" width="45px"></app-skeleton>
          <app-skeleton type="text" width="45px"></app-skeleton>
          <app-skeleton type="text" width="45px"></app-skeleton>
          <app-skeleton type="text" width="45px"></app-skeleton>
        </div>
      </td>

      <!-- Acciones -->
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <app-skeleton type="text" width="24px"></app-skeleton>
      </td>
    </tr>
  `,
  styles: []
})
export class TableRowSkeletonComponent {}
