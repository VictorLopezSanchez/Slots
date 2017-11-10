/**
 * File to create global and utils functions
 */

export const centerGameObjects = (objects) => {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5)
    })
}
