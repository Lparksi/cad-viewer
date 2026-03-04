import * as THREE from 'three'

/**
 * Highlight color.
 */
export const HIGHLIGHT_COLOR = new THREE.Color(0x08e8de)

/**
 * Type for materials that have color property
 */
type MaterialWithColor =
  | THREE.PointsMaterial
  | THREE.MeshBasicMaterial
  | THREE.LineBasicMaterial
  | THREE.MeshLambertMaterial
  | THREE.MeshPhongMaterial
  | THREE.MeshStandardMaterial
  | THREE.MeshToonMaterial

/**
 * Type for materials that have uniforms property (shader materials)
 */
type MaterialWithUniforms = THREE.ShaderMaterial
type MaterialWithInternalId = THREE.Material & { id?: number }

/**
 * @internal
 */
export class AcTrMaterialUtil {
  private static fallbackMaterialId = -1

  /**
   * Clone given material(s)
   */
  public static cloneMaterial(
    material: THREE.Material | THREE.Material[]
  ): THREE.Material | THREE.Material[] {
    if (!material) {
      return material
    }
    if (Array.isArray(material)) {
      const materials: THREE.Material[] = []
      material.forEach(mat => {
        materials.push(mat.clone())
      })
      return materials
    }
    return (material as THREE.Material).clone()
  }

  /**
   * Returns a stable numeric material id.
   *
   * Newer three typings no longer expose `material.id` publicly, while runtime
   * may still provide it. We prefer that runtime id; otherwise we assign one
   * deterministic fallback id on `userData`.
   */
  public static getMaterialId(material: THREE.Material): number {
    const internalId = (material as MaterialWithInternalId).id
    if (typeof internalId === 'number') {
      return internalId
    }

    const key = '__mlightcadMaterialId'
    const userData = material.userData as Record<string, unknown>
    const cached = userData[key]
    if (typeof cached === 'number') {
      return cached
    }

    const generated = AcTrMaterialUtil.fallbackMaterialId--
    userData[key] = generated
    return generated
  }

  public static setMaterialColor(
    material: THREE.Material | THREE.Material[],
    color: THREE.Color = HIGHLIGHT_COLOR
  ) {
    if (Array.isArray(material)) {
      material.forEach(mat => this.setMaterialColor(mat, color))
      return
    }

    // Handle materials with color property
    if (this.hasColorProperty(material)) {
      material.color.set(color)
      if (this.hasEmissiveProperty(material)) {
        material.emissive.set(color)
      }
    }

    // Handle shader materials with uniforms
    if (this.hasUniformsProperty(material)) {
      if (material.uniforms.u_color) {
        material.uniforms.u_color.value.set(color)
      }
    }
  }

  private static hasColorProperty(
    material: THREE.Material
  ): material is MaterialWithColor {
    return 'color' in material && material.color instanceof THREE.Color
  }

  private static hasEmissiveProperty(
    material: THREE.Material
  ): material is
    | THREE.MeshLambertMaterial
    | THREE.MeshPhongMaterial
    | THREE.MeshStandardMaterial
    | THREE.MeshToonMaterial {
    return 'emissive' in material && material.emissive instanceof THREE.Color
  }

  private static hasUniformsProperty(
    material: THREE.Material
  ): material is MaterialWithUniforms {
    return 'uniforms' in material && material.uniforms !== undefined
  }
}
