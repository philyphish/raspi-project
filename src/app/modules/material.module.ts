import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatIconModule,

];

@NgModule({
    imports: [CommonModule, materialModules],
    exports: [materialModules],
    declarations: []
})
export class MaterialModule {}