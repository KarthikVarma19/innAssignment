import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-addhelperskeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './addhelperskeleton.component.html',
  styleUrl: './addhelperskeleton.component.scss'
})
export class AddhelperskeletonComponent {
    
    constructor(private primengConfig: PrimeNGConfig) {}
    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
